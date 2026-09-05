import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, Search, SlidersHorizontal, ChevronDown, PackageOpen, RotateCcw } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, INDUSTRIES } from '../data/products';
import type { MaterialType } from '../types';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state filters
  const categoryParam = searchParams.get('category') || '';
  const industryParam = searchParams.get('industry') || '';
  const materialParam = searchParams.get('material') || '';
  const searchQuery = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(industryParam);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(materialParam);
  const [searchInput, setSearchInput] = useState<string>(searchQuery);
  const [sortBy, setSortBy] = useState<string>(sortParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedIndustry(searchParams.get('industry') || '');
    setSelectedMaterial(searchParams.get('material') || '');
    setSearchInput(searchParams.get('q') || '');
    setSortBy(searchParams.get('sort') || 'featured');
  }, [searchParams]);

  const updateParam = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSelectedCategory('');
    setSelectedIndustry('');
    setSelectedMaterial('');
    setSearchInput('');
    setSortBy('featured');
    setVisibleCount(8);
  };

  // Distinct materials from products
  const materials: MaterialType[] = ['PET', 'HDPE', 'Glass', 'Amber Glass', 'Frosted Glass', 'PP'];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      // Industry filter
      if (selectedIndustry && !p.industry.includes(selectedIndustry as any)) {
        return false;
      }
      // Material filter
      if (selectedMaterial && p.material !== selectedMaterial) {
        return false;
      }
      // Search query
      if (searchInput.trim()) {
        const q = searchInput.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.capacities.some((cap) => cap.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'moq-asc') return a.moq - b.moq;
      if (sortBy === 'moq-desc') return b.moq - a.moq;
      return 0; // 'featured'
    });
  }, [selectedCategory, selectedIndustry, selectedMaterial, searchInput, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const hasActiveFilters = Boolean(
    selectedCategory || selectedIndustry || selectedMaterial || searchInput
  );

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-b border-beige pb-6 sm:pb-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-beige/80 border border-gold/40 text-[11px] uppercase tracking-luxury text-gold-dark font-medium mb-2">
              <span>Wholesale Packaging Catalogue</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight">
              All Packaging Products
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1 max-w-xl">
              Commercial-grade bottles, jars, dispensers, and closures. Request competitive wholesale quotes for orders starting at minimum order quantities.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-charcoal-500 font-medium sm:text-right">
            Showing <span className="font-bold text-charcoal">{displayedProducts.length}</span> of{' '}
            <span className="font-bold text-charcoal">{filteredProducts.length}</span> products
          </div>
        </div>

        {/* Search Bar & Mobile Filter Trigger */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                updateParam('q', e.target.value);
              }}
              placeholder="Search by product name, volume (e.g. 500ml), or material..."
              className="w-full bg-white border border-beige rounded-lg pl-10 pr-10 py-2.5 text-xs sm:text-sm text-charcoal placeholder-charcoal-400 focus:outline-none focus:border-gold shadow-2xs"
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput('');
                  updateParam('q', '');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-beige hover:border-gold/50 text-charcoal px-4 py-2.5 rounded-lg text-xs font-semibold shadow-2xs lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <span>Filter Packaging</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            <span className="text-xs text-charcoal-400 shrink-0 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                updateParam('sort', e.target.value);
              }}
              className="w-full sm:w-48 bg-white border border-beige rounded-lg px-3 py-2.5 text-xs text-charcoal font-medium focus:outline-none focus:border-gold shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="moq-asc">MOQ: Low to High</option>
              <option value="moq-desc">MOQ: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-beige/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-charcoal-500 mr-1">Active filters:</span>

            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 bg-ivory border border-beige text-charcoal text-xs px-2.5 py-1 rounded-full">
                <span>Cat: {CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}</span>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    updateParam('category', '');
                  }}
                  className="hover:text-gold"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedIndustry && (
              <span className="inline-flex items-center gap-1.5 bg-ivory border border-beige text-charcoal text-xs px-2.5 py-1 rounded-full">
                <span>Industry: {INDUSTRIES.find((i) => i.id === selectedIndustry)?.name || selectedIndustry}</span>
                <button
                  onClick={() => {
                    setSelectedIndustry('');
                    updateParam('industry', '');
                  }}
                  className="hover:text-gold"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedMaterial && (
              <span className="inline-flex items-center gap-1.5 bg-ivory border border-beige text-charcoal text-xs px-2.5 py-1 rounded-full">
                <span>Material: {selectedMaterial}</span>
                <button
                  onClick={() => {
                    setSelectedMaterial('');
                    updateParam('material', '');
                  }}
                  className="hover:text-gold"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchInput && (
              <span className="inline-flex items-center gap-1.5 bg-ivory border border-beige text-charcoal text-xs px-2.5 py-1 rounded-full">
                <span>Query: "{searchInput}"</span>
                <button
                  onClick={() => {
                    setSearchInput('');
                    updateParam('q', '');
                  }}
                  className="hover:text-gold"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1 text-xs text-gold-dark hover:underline font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear all</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white border border-beige rounded-xl p-5 shadow-2xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-beige">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gold" />
              <span className="font-serif text-sm font-semibold text-charcoal">Filter Products</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-charcoal-400 hover:text-gold transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs uppercase tracking-luxury text-charcoal-400 font-semibold mb-2.5">
              Categories
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedCategory('');
                  updateParam('category', '');
                }}
                className={`w-full text-left text-xs py-1.5 px-2.5 rounded transition-colors flex items-center justify-between ${
                  !selectedCategory
                    ? 'bg-beige/60 font-semibold text-charcoal'
                    : 'text-charcoal-600 hover:bg-beige/30'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-charcoal-400">{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    const val = selectedCategory === cat.id ? '' : cat.id;
                    setSelectedCategory(val);
                    updateParam('category', val);
                  }}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded transition-colors flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-beige/60 font-semibold text-charcoal'
                      : 'text-charcoal-600 hover:bg-beige/30'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-charcoal-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div className="border-t border-beige/60 pt-4">
            <h3 className="text-xs uppercase tracking-luxury text-charcoal-400 font-semibold mb-2.5">
              Materials
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => {
                    const val = selectedMaterial === mat ? '' : mat;
                    setSelectedMaterial(val);
                    updateParam('material', val);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                    selectedMaterial === mat
                      ? 'bg-charcoal text-ivory border-charcoal font-semibold'
                      : 'bg-ivory text-charcoal-700 border-beige hover:border-gold/40'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="border-t border-beige/60 pt-4">
            <h3 className="text-xs uppercase tracking-luxury text-charcoal-400 font-semibold mb-2.5">
              Industry Use
            </h3>
            <div className="space-y-1">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => {
                    const val = selectedIndustry === ind.id ? '' : ind.id;
                    setSelectedIndustry(val);
                    updateParam('industry', val);
                  }}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded transition-colors flex items-center justify-between ${
                    selectedIndustry === ind.id
                      ? 'bg-beige/60 font-semibold text-charcoal'
                      : 'text-charcoal-600 hover:bg-beige/30'
                  }`}
                >
                  <span>{ind.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl border border-beige p-12 text-center space-y-4 shadow-2xs">
              <PackageOpen className="w-12 h-12 mx-auto text-charcoal-400" />
              <h3 className="font-serif text-lg font-semibold text-charcoal">
                No matching packaging found
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                We couldn't find any products matching your active filters. Try adjusting your search query or clear all filters to see our full catalogue.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 bg-charcoal text-ivory px-5 py-2.5 rounded-md text-xs font-semibold hover:bg-charcoal-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="inline-flex items-center gap-2 bg-white border border-beige hover:border-gold/50 text-charcoal px-6 py-3 rounded-md text-xs font-semibold shadow-2xs hover:shadow transition-all"
                  >
                    <span>Load More Packaging Products</span>
                    <ChevronDown className="w-4 h-4 text-gold" />
                  </button>
                  <p className="text-[11px] text-charcoal-400 mt-2">
                    Viewing {displayedProducts.length} of {filteredProducts.length} items
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-5 flex flex-col z-10 animate-slide-in-right">
            <div className="flex items-center justify-between pb-4 border-b border-beige">
              <span className="font-serif font-semibold text-base text-charcoal">Filters</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded text-charcoal hover:bg-beige/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="text-xs uppercase tracking-luxury text-charcoal-400 font-semibold mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        const val = selectedCategory === cat.id ? '' : cat.id;
                        setSelectedCategory(val);
                        updateParam('category', val);
                      }}
                      className={`w-full text-left text-xs py-2 px-2.5 rounded ${
                        selectedCategory === cat.id
                          ? 'bg-beige font-semibold text-charcoal'
                          : 'text-charcoal-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <h4 className="text-xs uppercase tracking-luxury text-charcoal-400 font-semibold mb-2">
                  Material
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {materials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => {
                        const val = selectedMaterial === mat ? '' : mat;
                        setSelectedMaterial(val);
                        updateParam('material', val);
                      }}
                      className={`text-xs px-2.5 py-1.5 rounded-md border ${
                        selectedMaterial === mat
                          ? 'bg-charcoal text-ivory border-charcoal font-semibold'
                          : 'bg-ivory border-beige text-charcoal'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-beige flex gap-2">
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-2.5 text-xs font-semibold bg-beige/50 text-charcoal rounded-md"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold bg-charcoal text-ivory rounded-md"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
