"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, Tv, Bookmark, BookmarkCheck, Film, Play, ChevronLeft, ChevronRight, Clock, CalendarClock } from "lucide-react";
import type { Series, ContentItem, Episode, Season } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { Badge, GenreChip, ReleaseStatusBadge, StarRating } from "@/components/ui/Meta";
import { NextEpisodeBadge } from "@/components/content/NextEpisodeBadge";
import { formatEpisodeDateLong } from "@/lib/episode";
import { SeasonSwitcher } from "@/components/content/SeasonSwitcher";
import { SimilarContent } from "@/components/content/SimilarContent";
import { EpisodeGrid } from "@/components/content/EpisodeGrid";
import { VideoPlayer } from "@/components/content/VideoPlayer";
import { VoiceoverPicker } from "@/components/content/VoiceoverPicker";
import { AgeGate } from "@/components/content/AgeGate";
import { formatAge } from "@/lib/age";
import { plural } from "@/lib/plural";
import { pickLatestSeason, seasonKey } from "@/lib/seasons";
import { saveContinue } from "@/lib/continue-watching";
import {
  buildOptions,
  chooseOption,
  parseVoiceoverSlug,
  type SeasonSources,
  type VoiceoverOption,
} from "@/lib/voiceovers";
import { useFavorites } from "@/components/providers/FavoritesContext";
import { useAuth } from "@/components/providers/AuthContext";


export function SeriesDetailClient({
  series,
  similar,
}: {
  series: Series;
  similar: ContentItem[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFavorite, toggle } = useFavorites();



  

  // «Назад»: если страницу открыли по прямой ссылке, истории нет — ведём в каталог.
  const goBack = useCallback(() => {
    if (window.history.length > 1) router.back();
    else router.push("/catalog");
  }, [router]);

  const playerRef = useRef<HTMLDivElement>(null);

  // Какой сезон открыть: явно выбранный (?season=slug), иначе ПОСЛЕДНИЙ
  // вышедший. Раньше открывался сезон по slug страницы — для франшизы,
  // начавшейся в 2013 году, это давало 2013-й вместо актуального сезона.
  const seasonFromUrl = searchParams.get("season");
  const defaultKey = useMemo(() => {
    const fromUrl = seasonFromUrl
      ? series.seasons.find((s) => s.slug === seasonFromUrl)
      : undefined;
    const season = fromUrl ?? pickLatestSeason(series.seasons) ?? series.seasons[0];
    return season ? seasonKey(season) : "";
  }, [series.seasons, seasonFromUrl]);

  // Активный сезон хранится в состоянии: серии всех сезонов франшизы уже
  // пришли с сервера, поэтому переключение не требует перехода на другую
  // страницу (раньше — загрузка, скелетон и прыжок наверх).
  const [activeKey, setActiveKey] = useState(defaultKey);
  useEffect(() => setActiveKey(defaultKey), [series.slug, defaultKey]);

  const activeSeasonDoc =
    series.seasons.find((s) => seasonKey(s) === activeKey) ?? series.seasons[0];

  const currentSeason =
    activeSeasonDoc ?? { seasonNumber: 1, episodes: [] as Episode[] };

  // Данные шапки — активного сезона (по умолчанию последнего); если у сезона
  // поле не заполнено, берём данные тайтла.
  const view = {
    releaseYear: activeSeasonDoc?.releaseYear || series.releaseYear,
    releaseStatus: activeSeasonDoc?.releaseStatus ?? series.releaseStatus,
    nextEpisode: activeSeasonDoc?.nextEpisode,
    rating: activeSeasonDoc?.rating || series.rating,
    ageRating: activeSeasonDoc?.ageRating ?? series.ageRating,
    description: activeSeasonDoc?.description || series.description,
    poster: activeSeasonDoc?.poster?.url ? activeSeasonDoc.poster : series.poster,
    backdrop: activeSeasonDoc?.backdrop?.url ? activeSeasonDoc.backdrop : series.backdrop,
  };

  // slug записи Content активного сезона: по нему хранятся «просмотренные»
  // серии и ссылка «продолжить просмотр».
  const seasonSlug = "slug" in currentSeason && currentSeason.slug ? currentSeason.slug : series.slug;

  const isFav = isFavorite(series.id);

  const episodeFromUrl = searchParams.get("episode");
  const initialEpisodeNumber = episodeFromUrl ? parseInt(episodeFromUrl, 10) : null;

  const findEpisode = useCallback(
    (num: number | null): Episode | null => {
      if (!currentSeason.episodes || num === null) return null;
      return currentSeason.episodes.find((e) => e.episodeNumber === num) ?? null;
    },
    [currentSeason.episodes]
  );

  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(
    findEpisode(initialEpisodeNumber)
  );

  useEffect(() => {
    const num = searchParams.get("episode");
    const parsed = num ? parseInt(num, 10) : null;
    setActiveEpisode(findEpisode(parsed));
  }, [searchParams, findEpisode]);

  /* --------------------------- Просмотренные серии -------------------------- */

  const watchedKey = `watched:${seasonSlug}`;
  const [watched, setWatched] = useState<ReadonlySet<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(watchedKey);
      const list = raw ? (JSON.parse(raw) as unknown) : [];
      if (Array.isArray(list)) setWatched(new Set(list.filter((n): n is number => typeof n === "number")));
    } catch {
      // localStorage недоступен или данные повреждены — просто не отмечаем.
    }
  }, [watchedKey]);

  const markWatched = useCallback(
    (num: number) => {
      setWatched((prev) => {
        if (prev.has(num)) return prev;
        const next = new Set(prev).add(num);
        try {
          localStorage.setItem(watchedKey, JSON.stringify([...next]));
        } catch {
          // см. выше
        }
        return next;
      });
    },
    [watchedKey],
  );

  /* ------------------------------ Выбор серии ------------------------------- */

  // Плеер уже виден (на телефоне он «прилипает» под шапкой) — не дёргаем
  // страницу. Прокручиваем, только если плеер за пределами экрана.
  const revealPlayer = useCallback(() => {
    requestAnimationFrame(() => {
      const el = playerRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 64 || top > window.innerHeight * 0.6) {
        window.scrollTo({ top: window.scrollY + top - 72, behavior: "smooth" });
      }
    });
  }, []);

  const selectEpisode = useCallback(
    (episode: Episode) => {
      // history.replaceState, а не router.replace: Next синхронизирует его с
      // useSearchParams, но не делает запрос на сервер. router.replace менял
      // страницу целиком, показывал app/loading.tsx (скелетон главной), высота
      // страницы схлопывалась и браузер прыгал наверх.
      const params = new URLSearchParams(window.location.search);
      params.set("episode", String(episode.episodeNumber));
      window.history.replaceState(null, "", `?${params.toString()}`);



      setActiveEpisode(episode);
      markWatched(episode.episodeNumber);
      saveContinue({
        slug: seasonSlug,
        titleRu: series.titleRu,
        posterUrl: view.poster?.url || undefined,
        ageRating: view.ageRating,
        episode: episode.episodeNumber,
      });
      revealPlayer();
    },
    [markWatched, revealPlayer, seasonSlug, series.titleRu, view.poster?.url, view.ageRating],
  );

  const selectSeason = useCallback((season: Season) => {
    if (!season.slug) return;
    setActiveKey(seasonKey(season));
    setActiveEpisode(null);
    // Выбор сезона пишем в ?season=slug: обновление страницы и «поделиться»
    // открывают тот же сезон, при этом запроса к серверу нет.
    const params = new URLSearchParams(window.location.search);
    params.set("season", season.slug);
    params.delete("episode");
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  const sortedEpisodes = useMemo(
    () => [...(currentSeason.episodes ?? [])].sort((a, b) => a.episodeNumber - b.episodeNumber),
    [currentSeason.episodes],
  );
  const activeIndex = activeEpisode
    ? sortedEpisodes.findIndex((e) => e.episodeNumber === activeEpisode.episodeNumber)
    : -1;
  const prevEpisode = activeIndex > 0 ? sortedEpisodes[activeIndex - 1] : null;
  const nextEpisode =
    activeIndex >= 0 && activeIndex < sortedEpisodes.length - 1 ? sortedEpisodes[activeIndex + 1] : null;

  // Автопереход: плеер сообщает об окончании серии (см. VideoPlayer.onEnded).
  const [autoNext, setAutoNext] = useState(true);
  useEffect(() => {
    try {
      setAutoNext(localStorage.getItem("auto-next") !== "off");
    } catch {
      // по умолчанию включено
    }
  }, []);
  const toggleAutoNext = () =>
    setAutoNext((v) => {
      try {
        localStorage.setItem("auto-next", v ? "off" : "on");
      } catch {
        // см. выше
      }
      return !v;
    });
  const handleEnded = useCallback(() => {
    if (autoNext && nextEpisode) selectEpisode(nextEpisode);
  }, [autoNext, nextEpisode, selectEpisode]);

  const startWatching = () => {
    if (activeEpisode) return revealPlayer();
    const first = sortedEpisodes.find((e) => !watched.has(e.episodeNumber)) ?? sortedEpisodes[0];
    if (first) selectEpisode(first);
  };

  /* -------------------------------- Озвучки --------------------------------- */

  // Ссылки других озвучек (коллекция episode-sources) грузятся лениво для
  // открытого сезона. Ошибка или отсутствие коллекции в CMS не мешают:
  // серия играет по основной ссылке, выбор озвучки просто не показывается.
  const [sourcesBySeason, setSourcesBySeason] = useState<Record<string, SeasonSources>>({});
  const requestedSeasons = useRef<Set<string>>(new Set());
  const activeSeasonId = activeSeasonDoc?.id;

  useEffect(() => {
    const id = Number(activeSeasonId);
    if (!Number.isInteger(id) || id <= 0) return;
    const key = String(id);
    if (requestedSeasons.current.has(key)) return;
    requestedSeasons.current.add(key);

    fetch(`/api/episode-sources?season=${id}`)
      .then((res) => (res.ok ? (res.json() as Promise<SeasonSources>) : null))
      .then((data) => {
        if (data && typeof data === "object") setSourcesBySeason((prev) => ({ ...prev, [key]: data }));
      })
      .catch(() => {
        // нет сети/коллекции — остаёмся на основной озвучке
      });
  }, [activeSeasonId]);

  // Выбранная озвучка: ?voiceover=slug (ссылкой делились) или запомненная в браузере.
  const [preferredVoiceover, setPreferredVoiceover] = useState<string | null>(null);
  useEffect(() => {
    let slug = parseVoiceoverSlug(new URLSearchParams(window.location.search).get("voiceover"));
    if (!slug) {
      try {
        slug = parseVoiceoverSlug(localStorage.getItem("voiceover"));
      } catch {
        // localStorage недоступен — без запоминания
      }
    }
    setPreferredVoiceover(slug);
  }, []);

  const voiceoverOptions = useMemo(
    () =>
      activeEpisode
        ? buildOptions(
            activeEpisode.embedUrl,
            sourcesBySeason[String(activeSeasonId)]?.[activeEpisode.episodeNumber],
          )
        : [],
    [activeEpisode, sourcesBySeason, activeSeasonId],
  );
  const activeVoiceover = chooseOption(voiceoverOptions, preferredVoiceover);

  const selectVoiceover = useCallback((option: VoiceoverOption) => {
    setPreferredVoiceover(option.slug);
    const params = new URLSearchParams(window.location.search);
    if (option.slug) params.set("voiceover", option.slug);
    else params.delete("voiceover");
    window.history.replaceState(null, "", `?${params.toString()}`);
    try {
      if (option.slug) localStorage.setItem("voiceover", option.slug);
      else localStorage.removeItem("voiceover");
    } catch {
      // см. выше
    }
  }, []);

  const safeEmbedUrl = activeVoiceover?.url ?? (activeEpisode ? activeEpisode.embedUrl : undefined);
  const activeEpisodeNumber = activeEpisode?.episodeNumber;
  // Части одного сезона считаем как один сезон.
  const seasonsCount = new Set(series.seasons.map((s) => s.seasonNumber)).size;
  const totalEpisodes = series.seasons.reduce((a, s) => a + (s.episodes?.length ?? 0), 0);

  return (
    <AgeGate ageRating={view.ageRating}>
    <div className="bg-[#08080A] text-white">
      {/* Hero Section */}
      <div className="relative h-[220px] sm:h-[420px] overflow-hidden">
        <Image
          src={view.backdrop?.url || "/default-backdrop.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/80 to-transparent" />

        <button
          onClick={goBack}
          className="absolute top-20 left-4 sm:left-8 flex items-center gap-2 text-sm text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster Column */}
          <div className="shrink-0 w-36 sm:w-56 lg:w-64 mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#121214] relative group">
              <Image
                src={view.poster?.url || "/default-poster.jpg"}
                alt={series.titleRu}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {formatAge(view.ageRating) && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-black/70 text-white ring-1 ring-white/20">
                  {formatAge(view.ageRating)}
                </span>
              )}
            </div>
          </div>

          {/* Info Column */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
              <Badge variant="series">СЕРИАЛ</Badge>
              {series.isNew && <Badge variant="new">НОВИНКА</Badge>}
              <ReleaseStatusBadge status={view.releaseStatus} showReleased />
              <NextEpisodeBadge next={view.nextEpisode} />
              {series.genres.map((g, idx) => (
                <GenreChip key={idx} label={g} />
              ))}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1 [text-wrap:balance]">
              {series.titleRu}
            </h1>
            <p className="text-[#8E8E98] text-sm mb-4 font-medium">{series.titleEn}</p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 mb-5 text-sm text-[#A1A1AA]">
              <StarRating rating={view.rating} />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {view.releaseYear || "—"}
              </span>
              <span className="flex items-center gap-1.5">
                <Tv className="w-4 h-4" />
                {seasonsCount} {plural(seasonsCount, ["сезон", "сезона", "сезонов"])}
              </span>
              <span className="text-[#8E8E98]">
                {totalEpisodes} {plural(totalEpisodes, ["серия", "серии", "серий"])}
              </span>
              {formatAge(view.ageRating) && (
                <span className="px-1.5 py-0.5 rounded border border-[#A1A1AA]/40 text-xs font-semibold">
                  {formatAge(view.ageRating)}
                </span>
              )}
            </div>

            <p className="text-[#A1A1AA] leading-relaxed mb-6 max-w-2xl line-clamp-4 sm:line-clamp-3 md:mx-0 mx-auto">
              {view.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 md:justify-start">
              {sortedEpisodes.length > 0 && (
                <Btn size="lg" variant="primary" className="w-full sm:w-auto" onClick={startWatching}>
                  <Play className="w-5 h-5" />
                  {activeEpisode ? "К просмотру" : watched.size > 0 ? "Продолжить" : "Смотреть"}
                </Btn>
              )}
              <Btn
                size="lg"
                variant={isFav ? "danger" : "outline"}
                className="w-full sm:w-auto"
                onClick={() => toggle(series.id)}
              >
                {isFav ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                {isFav ? "В избранном" : "В избранное"}
              </Btn>
            </div>

            {(series.director || series.cast) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/3 border border-white/6 mt-6 text-left">
                {series.director && (
                  <div>
                    <p className="text-xs text-[#8E8E98] font-medium uppercase tracking-wider mb-1">
                      Режиссёр
                    </p>
                    <p className="text-sm text-white font-medium">{series.director}</p>
                  </div>
                )}
                {series.cast && (
                  <div>
                    <p className="text-xs text-[#8E8E98] font-medium uppercase tracking-wider mb-1">
                      В ролях
                    </p>
                    <p className="text-sm text-white font-medium">{series.cast.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ЭПИЗОДЫ: сезоны → плеер → выбор серии */}
        {series.seasons.length > 0 ? (
          <section className="mt-10 sm:mt-14">
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-white">
              <Film className="h-6 w-6 text-[#EF4A4F]" />
              Смотреть онлайн
            </h2>

            {view.releaseStatus === "ongoing" && (
              <p className="-mt-2 mb-4 text-sm text-[#8E8E98]">
                Сериал ещё выходит — новые серии появляются по мере выхода.
              </p>
            )}
            <NextEpisodeBadge next={view.nextEpisode} variant="note" />

            {/* Связанные сезоны (отдельные записи франшизы) */}
            <SeasonSwitcher seasons={series.seasons} activeKey={activeKey} onSelect={selectSeason} />

            {/* Плеер. На телефоне «прилипает» под шапкой, пока листаешь серии. */}
            <div
              ref={playerRef}
              className={cn(
                "z-30 -mx-4 bg-[#08080A] px-4 pb-3 pt-2 sm:mx-0 sm:px-0",
                activeEpisode && "sticky top-16 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.9)] lg:static lg:shadow-none",
              )}
            >
              <VideoPlayer embedUrl={safeEmbedUrl} episodeNumber={activeEpisodeNumber} ageRating={view.ageRating} onEnded={handleEnded} />

              {activeEpisode && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!prevEpisode}
                    onClick={() => prevEpisode && selectEpisode(prevEpisode)}
                    aria-label="Предыдущая серия"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="min-w-0 flex-1 text-center">
                    <p className="truncate text-sm font-semibold text-white">
                      Серия {activeEpisode.episodeNumber}
                      {activeEpisode.title && activeEpisode.title !== `Серия ${activeEpisode.episodeNumber}`
                        ? ` — ${activeEpisode.title}`
                        : ""}
                    </p>
                    {(activeEpisode.releaseDate || activeEpisode.duration > 0) && (
                      <p className="mt-0.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-xs text-[#8E8E98]">
                        {activeEpisode.releaseDate && (
                          <span className="flex items-center gap-1">
                            <CalendarClock className="h-3 w-3" />
                            Эфир {formatEpisodeDateLong(activeEpisode.releaseDate)}
                          </span>
                        )}
                        {activeEpisode.duration > 0 && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activeEpisode.duration} мин
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={!nextEpisode}
                    onClick={() => nextEpisode && selectEpisode(nextEpisode)}
                    aria-label="Следующая серия"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {activeEpisode && (
              <VoiceoverPicker options={voiceoverOptions} active={activeVoiceover} onSelect={selectVoiceover} />
            )}

            {activeEpisode && (
              <label className="mb-2 mt-1 flex cursor-pointer items-center justify-end gap-2 text-xs text-[#A1A1AA]">
                <input type="checkbox" checked={autoNext} onChange={toggleAutoNext} className="h-4 w-4 accent-[#EF4A4F]" />
                Автопереход на следующую серию
              </label>
            )}

            {activeEpisode?.description && (
              <p className="mb-5 mt-2 text-sm leading-relaxed text-[#A1A1AA]">{activeEpisode.description}</p>
            )}

            {/* Выбор серии */}
            <div className="mt-4">
              <div className="mb-3 flex items-baseline justify-between">
                <h3 className="text-base font-bold text-white">Серии</h3>
                <span className="text-xs text-[#8E8E98]">
                  {sortedEpisodes.length} {plural(sortedEpisodes.length, ["серия", "серии", "серий"])}
                </span>
              </div>

              {sortedEpisodes.length > 0 ? (
                <EpisodeGrid
                  episodes={sortedEpisodes}
                  activeNumber={activeEpisodeNumber ?? null}
                  watched={watched}
                  onSelect={selectEpisode}
                  upcoming={view.nextEpisode}
                />
              ) : (
                <p className="py-8 text-center text-sm text-[#8E8E98]">
                  Для этого сезона пока нет загруженных эпизодов.
                </p>
              )}
            </div>
          </section>
        ) : (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white mb-2">Эпизоды</h2>
            <p className="text-sm text-[#8E8E98]">Сезоны для этого сериала пока не добавлены.</p>
          </div>
        )}

        <SimilarContent title="Похожие сериалы" items={similar} />
      </div>
    </div>
    </AgeGate>
  );
}
