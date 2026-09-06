"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Film, Bookmark, BookmarkCheck } from "lucide-react";
import type { Movie, ContentItem } from "@/lib/types";
import { formatDuration } from "@/lib/utils";
import { Btn } from "@/components/ui/Btn";
import { Badge, GenreChip, StarRating } from "@/components/ui/Meta";
import { MovieCard } from "@/components/content/MovieCard";
import { useFavorites } from "@/components/providers/FavoritesContext";

export function MovieDetailClient({ movie, similar }: { movie: Movie; similar: ContentItem[] }) {
  const router = useRouter();
  const { isFavorite, toggle } = useFavorites();
  const isFav = isFavorite(movie.id);

  console.log(movie);
  

  return (
    <div>
      <div className="relative h-[300px] sm:h-[420px] overflow-hidden">
        {/* Backdrop — LCP-элемент страницы фильма (ТЗ, п.4.1) */}
        <Image src={movie.backdrop?.url} alt="" fill priority sizes="100vw" className="object-cover object-center" />
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
                src={movie.poster?.url ?? "/default-poster.jpg"}
                alt={movie.titleRu}
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {movie.isNew && <Badge variant="new">НОВИНКА</Badge>}
              {movie.genres.map((g) => (
                <GenreChip key={g} label={g} />
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-1">{movie.titleRu}</h1>
            <p className="text-[#71717A] text-sm mb-4 font-medium">{movie.titleEn}</p>

            <div className="flex flex-wrap items-center gap-5 mb-5 text-sm text-[#A1A1AA]">
              <StarRating rating={movie.rating} />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {movie.releaseYear}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDuration(movie.duration)}
              </span>
              <span className="flex items-center gap-1.5">
                <Film className="w-4 h-4" />
                Фильм
              </span>
            </div>

            <p className="text-[#A1A1AA] leading-relaxed mb-6 max-w-2xl">{movie.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Btn size="lg" variant={isFav ? "danger" : "primary"} onClick={() => toggle(movie.id)}>
                {isFav ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                {isFav ? "В избранном" : "Добавить в избранное"}
              </Btn>
            </div>

            {(movie.director || movie.cast) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/3 border border-white/6">
                {movie.director && (
                  <div>
                    <p className="text-xs text-[#71717A] font-medium uppercase tracking-wider mb-1">Режиссёр</p>
                    <p className="text-sm text-white font-medium">{movie.director}</p>
                  </div>
                )}
                {movie.cast && (
                  <div>
                    <p className="text-xs text-[#71717A] font-medium uppercase tracking-wider mb-1">В ролях</p>
                    <p className="text-sm text-white font-medium">{movie.cast.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-white mb-5">Вам может понравиться</h2>
            <p className="text-xs text-[#3f3f46] mb-4">Функция рекомендаций появится в следующей версии</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {similar.map((m) => (
                <MovieCard key={m.id} item={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
