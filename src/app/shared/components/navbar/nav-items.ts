interface NavItem {
  path: string;
  title: string;
  icon?: string;
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'people_outline'
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'shopping_cart'
  },
]

export default links;
