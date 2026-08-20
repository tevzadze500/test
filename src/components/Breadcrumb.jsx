import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Visible breadcrumb trail matching the BreadcrumbList JSON-LD the same pages
 * emit — Google cross-checks schema breadcrumbs against on-page navigation.
 * `parent` is optional: { name, to } inserts an intermediate crumb
 * (Home › Blog › Article).
 */
const Breadcrumb = ({ name, parent = null, className = '' }) => (
  <nav aria-label="Breadcrumb" className={`text-sm text-dark-400 ${className}`}>
    <ol className="flex flex-wrap items-center gap-1.5">
      <li>
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
      </li>
      {parent && (
        <li className="flex items-center gap-1.5">
          <ChevronRight size={14} aria-hidden="true" className="shrink-0" />
          <Link to={parent.to} className="hover:text-white transition-colors">
            {parent.name}
          </Link>
        </li>
      )}
      <li className="flex items-center gap-1.5 min-w-0">
        <ChevronRight size={14} aria-hidden="true" className="shrink-0" />
        <span aria-current="page" className="text-dark-300 truncate">
          {name}
        </span>
      </li>
    </ol>
  </nav>
);

export default Breadcrumb;
