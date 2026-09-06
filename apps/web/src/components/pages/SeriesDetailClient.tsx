"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Tv, Bookmark, BookmarkCheck } from "lucide-react";
import type { Series, ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { Badge, GenreChip, StarRating } from "@/components/ui/Meta";
import { MovieCard } from "@/components/content/MovieCard";
import { EpisodeCard } from "@/components/content/EpisodeCard";
import { useFavorites } from "@/components/providers/FavoritesContext";

export function SeriesDetailClient({ series, similar }: { series: Series; similar: ContentItem[] }) {
  const router = useRouter();
  const { isFavorite, toggle } = useFavorites();
  // Стартуем с номера первого реально существующего сезона, а не с
  // хардкода 1 — у сериала может не быть сезона №1 (или сезонов вовсе).
  const [activeSeason, setActiveSeason] = useState(series.seasons[0]?.seasonNumber ?? 1);
  const isFav = isFavorite(series.id);
  const currentSeason = series.seasons.find((s) => s.seasonNumber === activeSeason) ?? series.seasons[0];

   
  
  return (
    <div>
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
        {/* Backdrop — LCP-элемент страницы сериала (ТЗ, п.4.1) */}
        <Image src={series.backdrop.url} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/80 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-20 left-4 sm:left-8 flex items-center gap-2 text-sm text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <div className="shrink-0 w-48 sm:w-56 lg:w-64 mx-auto md:mx-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#121214] relative">
              <Image
                src={series.poster?.url  ?? "/default-poster.jpg"}
                alt={series.titleRu}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="series">СЕРИАЛ</Badge>
              {series.isNew && <Badge variant="new">НОВИНКА</Badge>}
              {series.genres.map((g) => (
                <GenreChip key={g} label={g} />
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1">{series.titleRu}</h1>
            <p className="text-[#71717A] text-sm mb-4 font-medium">{series.titleEn}</p>

            <div className="flex flex-wrap items-center gap-5 mb-5 text-sm text-[#A1A1AA]">
              <StarRating rating={series.rating} />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {series.releaseYear}
              </span>
              <span className="flex items-center gap-1.5">
                <Tv className="w-4 h-4" />
                {series.seasons.length} сезона
              </span>
              <span className="text-[#71717A]">
                {series.seasons.reduce((a, s) => a + (s.episodes?.length ?? 0), 0)} эпизодов
              </span>
            </div>

            <p className="text-[#A1A1AA] leading-relaxed mb-6 max-w-2xl">{series.description}</p>

            <Btn size="lg" variant={isFav ? "danger" : "primary"} onClick={() => toggle(series.id)}>
              {isFav ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              {isFav ? "В избранном" : "Добавить в избранное"}
            </Btn>

            {(series.director || series.cast) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/3 border border-white/6 mt-6">
                {series.director && (
                  <div>
                    <p className="text-xs text-[#71717A] font-medium uppercase tracking-wider mb-1">Режиссёр</p>
                    <p className="text-sm text-white font-medium">{series.director}</p>
                  </div>
                )}
                {series.cast && (
                  <div>
                    <p className="text-xs text-[#71717A] font-medium uppercase tracking-wider mb-1">В ролях</p>
                    <p className="text-sm text-white font-medium">{series.cast.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {series.seasons.length > 0 ? (
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <h2 className="text-xl font-bold text-white">Эпизоды</h2>
              <div className="flex gap-2 flex-wrap">
                {series.seasons.map((s) => (
                  <button
                    key={s.seasonNumber}
                    onClick={() => setActiveSeason(s.seasonNumber)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-sm font-medium border transition-all",
                      activeSeason === s.seasonNumber
                        ? "bg-[#EF4A4F]/15 border-[#EF4A4F]/40 text-[#EF4A4F]"
                        : "border-white/8 text-[#71717A] hover:text-white hover:border-white/16"
                    )}
                  >
                    Сезон {s.seasonNumber}
                  </button>
                ))}
              </div>
            </div>

            {currentSeason && currentSeason.episodes.length > 0 ? (
              <div className="grid gap-3">
                {currentSeason.episodes.map((ep) => (
                  <EpisodeCard key={ep.episodeNumber} episode={ep} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#71717A]">Для этого сезона пока нет эпизодов.</p>
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
            <p className="text-xs text-[#3f3f46] mb-5">Функция рекомендаций появится в следующей версии</p>
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