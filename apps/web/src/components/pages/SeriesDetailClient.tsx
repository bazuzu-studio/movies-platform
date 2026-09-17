"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, Tv, Bookmark, BookmarkCheck, Film } from "lucide-react";
import type { Series, ContentItem, Episode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { Badge, GenreChip, StarRating } from "@/components/ui/Meta";
import { MovieCard } from "@/components/content/MovieCard";
import { EpisodeCard } from "@/components/content/EpisodeCard";
import { VideoPlayer } from "@/components/content/VideoPlayer";
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

  const playerRef = useRef<HTMLDivElement>(null);

  const activeSeason =
    series.seasons.find((s) => s.slug === series.slug)?.seasonNumber ??
    series.seasons[0]?.seasonNumber ??
    1;

  const currentSeason =
    series.seasons.find((s) => s.seasonNumber === activeSeason) ??
    series.seasons[0] ??
    { seasonNumber: activeSeason, episodes: [] as Episode[] };

  const otherSeasons = series.seasons.filter((s) => s.seasonNumber !== activeSeason);
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

  const handleEpisodeClick = useCallback(
    (episode: Episode) => {


      // Обновляем URL
      const params = new URLSearchParams(searchParams.toString());
      params.set("episode", String(episode.episodeNumber));
      router.replace(`?${params.toString()}`, { scroll: false });

      setActiveEpisode(episode);

      requestAnimationFrame(() => {
        playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    },
    [  router, searchParams]
  );

  // embedUrl отдаём только если auth готов и пользователь залогинен.
  // Пока authReady=false — не отдаём (на мгновение покажется fallback),
  // после проверки — либо плеер, либо редирект.
  const safeEmbedUrl =   activeEpisode ? activeEpisode.embedUrl : undefined;
  const activeEpisodeNumber = activeEpisode?.episodeNumber;

  return (
    <div className="bg-[#08080A] text-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
        <Image
          src={series.backdrop?.url || "/default-backdrop.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/80 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-20 left-4 sm:left-8 flex items-center gap-2 text-sm text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster Column */}
          <div className="shrink-0 w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#121214] relative group">
              <Image
                src={series.poster?.url ?? "/default-poster.jpg"}
                alt={series.titleRu}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="series">СЕРИАЛ</Badge>
              {series.isNew && <Badge variant="new">НОВИНКА</Badge>}
              {series.genres.map((g, idx) => (
                <GenreChip key={idx} label={g} />
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1">
              {series.titleRu}
            </h1>
            <p className="text-[#71717A] text-sm mb-4 font-medium">{series.titleEn}</p>

            <div className="flex flex-wrap items-center gap-5 mb-5 text-sm text-[#A1A1AA]">
              <StarRating rating={series.rating} />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {series.releaseYear || "—"}
              </span>
              <span className="flex items-center gap-1.5">
                <Tv className="w-4 h-4" />
                {series.seasons.length} сезона
              </span>
              <span className="text-[#71717A]">
                {series.seasons.reduce((a, s) => a + (s.episodes?.length ?? 0), 0)} эпизодов
              </span>
            </div>

            <p className="text-[#A1A1AA] leading-relaxed mb-6 max-w-2xl line-clamp-3">
              {series.description}
            </p>

            <Btn
              size="lg"
              variant={isFav ? "danger" : "primary"}
              onClick={() => toggle(series.id)}
            >
              {isFav ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              {isFav ? "В избранном" : "Добавить в избранное"}
            </Btn>

            {(series.director || series.cast) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/3 border border-white/6 mt-6">
                {series.director && (
                  <div>
                    <p className="text-xs text-[#71717A] font-medium uppercase tracking-wider mb-1">
                      Режиссёр
                    </p>
                    <p className="text-sm text-white font-medium">{series.director}</p>
                  </div>
                )}
                {series.cast && (
                  <div>
                    <p className="text-xs text-[#71717A] font-medium uppercase tracking-wider mb-1">
                      В ролях
                    </p>
                    <p className="text-sm text-white font-medium">{series.cast.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* SEASON NAVIGATION & OTHER SEASONS */}
        {series.seasons.length > 0 ? (
          <div className="mt-14">
            <div className="flex justify-between items-end mb-6 flex-wrap">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Film className="w-6 h-6 text-[#EF4A4F]" />
                Эпизоды сезона {currentSeason.seasonNumber}
              </h2>

              <div className="hidden md:flex gap-2 flex-wrap min-w-[200px]">
                {series.seasons.map((s) => {
                  const num = typeof s.seasonNumber === "number" ? s.seasonNumber : 1;
                  const href = s.slug ? `/series/${s.slug}` : "#";
                  return (
                    <Link
                      key={`${num}-${s.id}`}
                      href={href}
                      scroll={false}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all whitespace-nowrap",
                        activeSeason === num
                          ? "bg-[#EF4A4F]/15 border-[#EF4A4F]/40 text-[#EF4A4F] ring-1 ring-[#EF4A4F]/25"
                          : "border-white/8 text-[#71717A] hover:text-white hover:border-white/16 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      Сезон {num}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Блок «Другие сезоны» */}
            {otherSeasons.length > 0 && (
              <div className="mb-8 border-t border-white/10 pt-6 pb-4">
                <h3 className="text-sm font-semibold text-[#71717A] uppercase tracking-wider mb-4 flex items-center gap-2">
                  Другие части франшизы
                  <span className="text-[#EF4A4F]">•</span>
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {otherSeasons.map((s) => {
                    const num = typeof s.seasonNumber === "number" ? s.seasonNumber : 1;
                    const title = s.title || `Сезон ${num}`;
                    const posterUrl = s.poster?.url || series.poster?.url || "/default-poster.jpg";
                    const href = s.slug ? `/series/${s.slug}` : "#";

                    return (
                      <Link key={`${num}-${s.id}`} href={href} className="flex-shrink-0 group relative w-[140px]">
                        <div className="aspect-[2/3] rounded-xl overflow-hidden bg-[#121214] mb-2 group-hover:ring-2 group-hover:ring-[#EF4A4F] transition-ring duration-200">
                          <Image src={posterUrl} alt={title} fill className="object-cover" />
                        </div>
                        <h4 className="text-sm font-bold truncate">{title}</h4>
                        <p className="text-[10px] text-[#71717A] mt-1">{s.releaseYear || "—"}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Видеоплеер */}
            <div ref={playerRef} className="mb-6 scroll-mt-20">
              {activeEpisode && (
                <div className="mb-3 flex items-center gap-2 text-sm text-[#71717A]">
                  <span className="text-white font-semibold">
                    Серия {activeEpisode.episodeNumber}
                  </span>
                  <span>—</span>
                  <span>{activeEpisode.title}</span>
                </div>
              )}
              <VideoPlayer embedUrl={safeEmbedUrl} episodeNumber={activeEpisodeNumber} />
            </div>

            {/* Список эпизодов */}
            {currentSeason.episodes && currentSeason.episodes.length > 0 ? (
              <div className="grid gap-3">
                {[...currentSeason.episodes]
                  .sort((a, b) => a.episodeNumber - b.episodeNumber)
                  .map((ep) => (
                    <EpisodeCard
                      key={ep.id}
                      episode={ep}
                      onClick={() => handleEpisodeClick(ep)}
                      isSelected={activeEpisode?.id === ep.id}
                    />
                  ))}
              </div>
            ) : (
              <p className="text-sm text-[#71717A] py-8 text-center">
                Для этого сезона пока нет загруженных эпизодов.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white mb-2">Эпизоды</h2>
            <p className="text-sm text-[#71717A]">Сезоны для этого сериала пока не добавлены.</p>
          </div>
        )}

        {similar.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white mb-2">Похожие сериалы</h2>
            <p className="text-xs text-[#3f3f46] mb-5">
              Функция рекомендаций появится в следующей версии
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {similar.map((s) => (
                <MovieCard key={s.id} item={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
