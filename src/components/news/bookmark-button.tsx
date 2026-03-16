"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const BOOKMARKS_KEY = "iransavas-bookmarks";

export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(articleId: string): boolean {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(articleId);
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return false;
  } else {
    bookmarks.unshift(articleId);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks.slice(0, 100)));
    return true;
  }
}

export function isBookmarked(articleId: string): boolean {
  return getBookmarks().includes(articleId);
}

interface BookmarkButtonProps {
  articleId: string;
  className?: string;
  size?: number;
}

export function BookmarkButton({ articleId, className, size = 16 }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(articleId));
  }, [articleId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleBookmark(articleId);
    setSaved(newState);
    // Dispatch a custom event so other components can react
    window.dispatchEvent(new CustomEvent("bookmarks-changed"));
  };

  return (
    <button
      onClick={handleClick}
      title={saved ? "Yer iminden kaldır" : "Yer imine ekle"}
      className={cn(
        "rounded-md p-1 transition-colors",
        saved ? "text-red-400 hover:text-red-300" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <Bookmark size={size} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
