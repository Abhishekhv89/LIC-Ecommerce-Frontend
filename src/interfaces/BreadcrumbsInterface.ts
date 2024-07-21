interface Crumb {
  name: string;
  path: string;
  active: boolean;
}

export interface BreadcrumbsProps {
  crumbs: Crumb[];
}