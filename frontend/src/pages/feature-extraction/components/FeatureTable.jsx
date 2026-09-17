import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureTable = ({ features, onExport }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState(0);

  // Animate table rows on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleRows(prev => {
        if (prev < features?.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [features?.length]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSignificanceColor = (significance) => {
    switch (significance) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSignificanceIcon = (significance) => {
    switch (significance) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const filteredAndSortedFeatures = features?.filter(feature => {
      const matchesCategory = filterCategory === 'all' || feature?.category === filterCategory;
      const matchesSearch = feature?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      return matchesCategory && matchesSearch;
    })?.sort((a, b) => {
      if (!sortConfig?.key) return 0;
      
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const categories = ['all', ...new Set(features.map(f => f.category))];

  return (
    <div className="glass rounded-xl p-6 space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e?.target?.value)}
              className="glass-light rounded-lg px-4 py-2 pr-10 text-sm font-medium text-foreground border border-border/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-medical"
            >
              {categories?.map(category => (
                <option key={category} value={category} className="bg-surface text-foreground">
                  {category === 'all' ? 'All Categories' : category?.charAt(0)?.toUpperCase() + category?.slice(1)}
                </option>
              ))}
            </select>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>

          {/* Search */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="glass-light rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder-muted-foreground border border-border/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-medical w-full sm:w-64"
            />
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          onClick={onExport}
          className="self-start lg:self-auto"
        >
          Export Data
        </Button>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-lg border border-border/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="glass-light border-b border-border/20">
              <tr>
                {[
                  { key: 'name', label: 'Feature Name' },
                  { key: 'value', label: 'Extracted Value' },
                  { key: 'normalRange', label: 'Normal Range' },
                  { key: 'significance', label: 'Significance' },
                  { key: 'category', label: 'Category' }
                ]?.map(column => (
                  <th
                    key={column?.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-muted/5 transition-medical"
                    onClick={() => handleSort(column?.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column?.label}</span>
                      <div className="flex flex-col">
                        <Icon 
                          name="ChevronUp" 
                          size={12} 
                          className={`${sortConfig?.key === column?.key && sortConfig?.direction === 'asc' ? 'text-primary' : 'text-muted-foreground/50'}`} 
                        />
                        <Icon 
                          name="ChevronDown" 
                          size={12} 
                          className={`-mt-1 ${sortConfig?.key === column?.key && sortConfig?.direction === 'desc' ? 'text-primary' : 'text-muted-foreground/50'}`} 
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredAndSortedFeatures?.map((feature, index) => (
                <motion.tr
                  key={feature?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index < visibleRows ? 1 : 0,
                    y: index < visibleRows ? 0 : 20
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-muted/5 transition-medical group"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground group-hover:text-primary transition-medical">
                      {feature?.name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {feature?.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-sm font-medium text-foreground">
                      {feature?.value} {feature?.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      {feature?.normalRange}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getSignificanceIcon(feature?.significance)} 
                        size={16} 
                        className={getSignificanceColor(feature?.significance)} 
                      />
                      <span className={`text-sm font-medium capitalize ${getSignificanceColor(feature?.significance)}`}>
                        {feature?.significance}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium glass-light border border-border/20">
                      {feature?.category}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredAndSortedFeatures?.map((feature, index) => (
          <motion.div
            key={feature?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: index < visibleRows ? 1 : 0,
              y: index < visibleRows ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-light rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{feature?.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{feature?.description}</p>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium glass border border-border/20 ml-3">
                {feature?.category}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Value</div>
                <div className="font-mono text-sm font-medium text-foreground mt-1">
                  {feature?.value} {feature?.unit}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Normal Range</div>
                <div className="text-sm text-muted-foreground mt-1">{feature?.normalRange}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-border/20">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getSignificanceIcon(feature?.significance)} 
                  size={16} 
                  className={getSignificanceColor(feature?.significance)} 
                />
                <span className={`text-sm font-medium capitalize ${getSignificanceColor(feature?.significance)}`}>
                  {feature?.significance} Significance
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* No Results */}
      {filteredAndSortedFeatures?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No features found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FeatureTable;