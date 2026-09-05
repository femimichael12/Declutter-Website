import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Instagram,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  ExternalLink,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Sparkles,
  Users,
  ShoppingBag,
  ArrowUpRight,
} from 'lucide-react';
import {
  socialPosts as defaultPosts,
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_HANDLE,
  type SocialPost,
} from '@/data/socialPosts';

interface SocialCarouselProps {
  posts?: SocialPost[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SocialCarousel({
  posts = defaultPosts,
  title = 'Follow Our Journey',
  subtitle = 'Behind the scenes, fresh arrivals, and community stories on Instagram',
  className = '',
}: SocialCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const isMulti = posts.length > 1;

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [posts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section className={`container-page mt-14 sm:mt-20 ${className}`}>
      {/* Header with Brand Link */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-500/10 text-pink-600">
              <Instagram className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-bold tracking-wide uppercase text-pink-600">
              Instagram Community
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold text-navy-900 sm:text-3xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-navy-500 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-royal-600 hover:text-royal-700 bg-royal-50/70 hover:bg-royal-100/70 px-3.5 py-2 rounded-xl transition-all border border-royal-100 shadow-2xs group"
          >
            <Instagram className="h-4 w-4 text-pink-600 group-hover:scale-110 transition-transform" />
            <span>{INSTAGRAM_HANDLE}</span>
            <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
          </a>

          {/* Desktop Arrow Controls (Only active when > 1 post) */}
          {isMulti && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous social post"
                className={`flex h-9 w-9 items-center justify-center rounded-xl border border-navy-200 transition ${
                  canScrollLeft
                    ? 'bg-white text-navy-900 shadow-2xs hover:border-royal-300 hover:bg-navy-50'
                    : 'bg-navy-50/60 text-navy-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next social post"
                className={`flex h-9 w-9 items-center justify-center rounded-xl border border-navy-200 transition ${
                  canScrollRight
                    ? 'bg-white text-navy-900 shadow-2xs hover:border-royal-300 hover:bg-navy-50'
                    : 'bg-navy-50/60 text-navy-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SINGLE POST SPOTLIGHT VIEW (When posts.length === 1) */}
      {!isMulti ? (
        <div className="grid gap-6 lg:grid-cols-12 items-center max-w-5xl mx-auto">
          
          {/* Left: Community & Brand Card (Desktop showcase only) */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 rounded-3xl p-7 text-white flex-col justify-between shadow-soft-lg h-full"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-2xl p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0">
                  <div className="h-full w-full rounded-[14px] bg-navy-900 flex items-center justify-center text-white text-xs font-bold border border-white/20">
                    <ShoppingBag className="h-5 w-5 text-royal-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm font-bold text-white">BuyAndSellOutlets</h3>
                    <BadgeCheck className="h-3.5 w-3.5 text-royal-400 fill-royal-400 flex-shrink-0" />
                  </div>
                  <span className="text-xs text-pink-400 font-semibold">{INSTAGRAM_HANDLE}</span>
                </div>
              </div>

              <h4 className="font-display text-xl font-bold text-white mb-2.5">
                Join our community across Nigeria 🇳🇬
              </h4>
              <p className="text-xs text-navy-200 leading-relaxed mb-6">
                Follow us on Instagram for unboxings, daily flash deals, customer reviews, and tips on certified electronics.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-navy-200">
                  <div className="h-6 w-6 rounded-lg bg-royal-600/30 flex items-center justify-center text-royal-400 flex-shrink-0">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span>Exclusive Instagram flash sale drops</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-navy-200">
                  <div className="h-6 w-6 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <BadgeCheck className="h-3.5 w-3.5" />
                  </div>
                  <span>Real inspection videos & battery tests</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-navy-200">
                  <div className="h-6 w-6 rounded-lg bg-pink-600/30 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span>Customer reviews & delivery updates</span>
                </div>
              </div>
            </div>

            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white font-bold text-xs shadow-soft hover:shadow-soft-lg hover:opacity-95 transition-all"
            >
              <Instagram className="h-4 w-4" />
              <span>Follow {INSTAGRAM_HANDLE}</span>
              <ArrowUpRight className="h-4 w-4 ml-0.5" />
            </a>
          </motion.div>

          {/* Right/Center: Featured Social Post Card */}
          <div className="lg:col-span-7 max-w-sm sm:max-w-md mx-auto w-full">
            {posts.map((post) => {
              const isLiked = likedPosts[post.id];
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden bg-white border border-navy-100 rounded-2xl sm:rounded-3xl shadow-soft hover:shadow-soft-lg transition-all"
                >
                  {/* Instagram Header */}
                  <div className="flex items-center justify-between p-3 sm:p-3.5 border-b border-navy-100 bg-white">
                    <a
                      href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group min-w-0"
                    >
                      <div className="h-8 w-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-navy-900 flex items-center justify-center text-white text-[10px] font-bold border border-white">
                          B
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs sm:text-sm font-bold text-navy-900 group-hover:text-royal-600 transition truncate">
                            {post.handle || INSTAGRAM_HANDLE}
                          </span>
                          <BadgeCheck className="h-3.5 w-3.5 text-royal-600 fill-royal-600 flex-shrink-0" />
                        </div>
                        <span className="text-[10px] text-navy-400 block truncate">
                          {post.tag || 'Official Community'}
                        </span>
                      </div>
                    </a>

                    <a
                      href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-semibold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100/80 px-2.5 py-1 rounded-full transition"
                    >
                      <Instagram className="h-3 w-3" />
                      <span>Follow</span>
                    </a>
                  </div>

                  {/* Post Image with Native Aspect Ratio */}
                  <div className="relative group overflow-hidden bg-slate-900/5">
                    <a
                      href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt={post.caption || 'BuyAndSellOutlets Instagram post'}
                        className="w-full h-auto object-contain max-h-[460px] mx-auto group-hover:scale-[1.015] transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-navy-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-navy-900 font-semibold text-xs px-3.5 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <Instagram className="h-3.5 w-3.5 text-pink-600" />
                          View on Instagram
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Action Bar */}
                  <div className="p-3 sm:p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`transition-colors p-1 -m-1 rounded-full ${
                            isLiked ? 'text-rose-600' : 'text-navy-700 hover:text-rose-600'
                          }`}
                          aria-label="Like post"
                        >
                          <Heart className={`h-4.5 w-4.5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                        </button>
                        <a
                          href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy-700 hover:text-royal-600 transition p-1 -m-1"
                          aria-label="Comment on Instagram"
                        >
                          <MessageCircle className="h-4.5 w-4.5" />
                        </a>
                        <a
                          href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy-700 hover:text-royal-600 transition p-1 -m-1"
                          aria-label="Share post"
                        >
                          <Send className="h-4.5 w-4.5" />
                        </a>
                      </div>

                      <a
                        href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-navy-400 hover:text-navy-700 transition p-1 -m-1"
                        aria-label="Bookmark on Instagram"
                      >
                        <Bookmark className="h-4.5 w-4.5" />
                      </a>
                    </div>

                    {/* Likes Count */}
                    <div className="text-xs font-bold text-navy-900">
                      Liked by <span className="font-semibold">buyandselloutlet</span> and{' '}
                      <span className="font-semibold">{isLiked ? '1,201 others' : '1,200 others'}</span>
                    </div>

                    {/* Caption */}
                    {post.caption && (
                      <div className="text-xs text-navy-800 leading-relaxed">
                        <span className="font-bold text-navy-900 mr-1.5">
                          {post.handle?.replace('@', '') || 'buyandselloutlet'}
                        </span>
                        <span>{post.caption}</span>
                      </div>
                    )}

                    {/* Bottom View on Instagram CTA Button */}
                    <div className="pt-1.5">
                      <a
                        href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-pink-300 hover:bg-pink-50/50 hover:text-pink-700 transition-all"
                      >
                        <Instagram className="h-3.5 w-3.5 text-pink-600" />
                        <span>View on Instagram</span>
                        <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MULTI POST CAROUSEL VIEW (When posts.length > 1) */
        <div
          ref={scrollRef}
          onScroll={updateScrollButtons}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-2 -mx-3.5 px-3.5 sm:mx-0 sm:px-0"
        >
          {posts.map((post, i) => {
            const isLiked = likedPosts[post.id];
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="w-[82vw] max-w-[340px] sm:w-[320px] lg:w-[340px] flex-shrink-0 snap-center card overflow-hidden bg-white border border-navy-100 rounded-2xl sm:rounded-3xl shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b border-navy-100 bg-white">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-8 w-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0">
                      <div className="h-full w-full rounded-full bg-navy-900 flex items-center justify-center text-white text-[10px] font-bold">
                        B
                      </div>
                    </div>
                    <span className="text-xs font-bold text-navy-900 truncate">
                      {post.handle || INSTAGRAM_HANDLE}
                    </span>
                    <BadgeCheck className="h-3 w-3 text-royal-600 fill-royal-600 flex-shrink-0" />
                  </div>
                  <Instagram className="h-4 w-4 text-pink-600" />
                </div>

                {/* Image */}
                <a
                  href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden block aspect-[4/5] bg-slate-100"
                >
                  <img
                    src={post.image}
                    alt={post.caption || 'Instagram post'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-navy-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/95 text-navy-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                      View Post
                    </span>
                  </div>
                </a>

                {/* Footer */}
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`transition-colors ${isLiked ? 'text-rose-600' : 'text-navy-700'}`}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-600' : ''}`} />
                      </button>
                      <MessageCircle className="h-4 w-4 text-navy-700" />
                      <Send className="h-4 w-4 text-navy-700" />
                    </div>
                    <Bookmark className="h-4 w-4 text-navy-400" />
                  </div>

                  {post.caption && (
                    <p className="text-xs text-navy-700 line-clamp-2 leading-relaxed">
                      <span className="font-bold text-navy-900 mr-1">
                        {post.handle?.replace('@', '') || 'buyandselloutlet'}
                      </span>
                      {post.caption}
                    </p>
                  )}

                  <a
                    href={post.instagramUrl || INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full py-1.5 text-xs text-royal-600 font-semibold flex items-center justify-center gap-1.5 rounded-xl border border-navy-100 hover:bg-royal-50"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
