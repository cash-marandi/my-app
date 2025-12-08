import { TeamMember, Event, NewsPost, Service } from '../types';

// Initial Data Seeds
const INITIAL_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Mokoena',
    role: 'Executive Director',
    bio: 'Over 15 years of experience in community development and education.',
    imageUrl: 'https://picsum.photos/id/64/400/400',
  },
  {
    id: '2',
    name: 'David Johnson',
    role: 'Head of Training',
    bio: 'Certified master trainer passionate about youth upliftment.',
    imageUrl: 'https://picsum.photos/id/91/400/400',
  },
  {
    id: '3',
    name: 'Thabo Nkosi',
    role: 'Community Liaison',
    bio: 'Bridging the gap between resources and the people who need them.',
    imageUrl: 'https://picsum.photos/id/103/400/400',
  },
];

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Youth Digital Skills Workshop',
    date: '2023-11-15',
    location: 'Panorama Centre, White River',
    description: 'A comprehensive 3-day workshop covering basic coding and digital literacy.',
    imageUrl: 'https://picsum.photos/id/1/800/600',
  },
  {
    id: '2',
    title: 'Annual Charity Gala',
    date: '2023-12-01',
    location: 'Mpumalanga Hall',
    description: 'Join us for an evening of giving back and celebrating our achievements.',
    imageUrl: 'https://picsum.photos/id/2/800/600',
  },
  {
    id: '3',
    title: 'Entrepreneurship Bootcamp',
    date: '2024-01-20',
    location: 'Community Hub',
    description: 'Learn how to start your own business with expert mentorship.',
    imageUrl: 'https://picsum.photos/id/3/800/600',
  }
];

const INITIAL_NEWS: NewsPost[] = [
  {
    id: '1',
    title: 'Empowering 500 Youth in 2023',
    excerpt: 'We have reached a major milestone in our mission to skill the youth of Mpumalanga.',
    content: 'Full article content goes here...',
    imageUrl: 'https://picsum.photos/id/4/800/400',
    date: '2023-10-10',
    category: 'Impact'
  },
  {
    id: '2',
    title: 'New Partnership with TechGiant',
    excerpt: 'Exciting news as we partner to bring high-speed internet to our classrooms.',
    content: 'Full article content goes here...',
    imageUrl: 'https://picsum.photos/id/6/800/400',
    date: '2023-09-22',
    category: 'Partnership'
  }
];

const INITIAL_SERVICES: Service[] = [
  { id: '1', title: 'Empowerment Workshops for Women', description: 'Providing relevant information for personal development, including Gender Based Violence workshops.', icon: 'Users' },
  { id: '2', title: 'Housekeeping Training', description: 'Three days of theory and two weeks of practicals to help unemployed women find jobs as domestic workers.', icon: 'Briefcase' },
  { id: '3', title: 'Hairdressing Training', description: 'A 3-day practical training to enhance hairdressing skills for women and youth.', icon: 'Award' },
  { id: '4', title: 'Shop Assistance Training', description: 'A 3-day training focusing on customer care to prepare participants for the retail job market.', icon: 'ShoppingCart' },
  { id: '5', title: 'Corporate Financial Management', description: 'A 3-day training for small businesses and co-operatives on financial management.', icon: 'DollarSign' },
  { id: '6', title: 'Youth Empowerment Workshops', description: 'Workshops for young school girls for personal growth and the distribution of sanitary towels.', icon: 'Heart' },
];

// Helper to simulate DB delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DB_VERSION = '1.1'; // Increment to force a refresh

class MockDB {
  private get<T>(key: string, initial: T): T {
    const versionedKey = `${key}_v${DB_VERSION}`;
    const stored = localStorage.getItem(versionedKey);
    if (!stored) {
      localStorage.setItem(versionedKey, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(stored);
  }

  private set<T>(key: string, data: T): void {
    const versionedKey = `${key}_v${DB_VERSION}`;
    localStorage.setItem(versionedKey, JSON.stringify(data));
  }

  // --- Team ---
  async getTeam(): Promise<TeamMember[]> {
    await delay(300);
    return this.get('team', INITIAL_TEAM);
  }

  async addTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    await delay(500);
    const list = this.get('team', INITIAL_TEAM);
    const newItem = { ...member, id: Math.random().toString(36).substr(2, 9) };
    this.set('team', [...list, newItem]);
    return newItem;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await delay(300);
    const list = this.get('team', INITIAL_TEAM);
    this.set('team', list.filter(i => i.id !== id));
  }

  // --- Events ---
  async getEvents(): Promise<Event[]> {
    await delay(300);
    return this.get('events', INITIAL_EVENTS);
  }

  async addEvent(event: Omit<Event, 'id'>): Promise<Event> {
    await delay(500);
    const list = this.get('events', INITIAL_EVENTS);
    const newItem = { ...event, id: Math.random().toString(36).substr(2, 9) };
    this.set('events', [...list, newItem]);
    return newItem;
  }

  async deleteEvent(id: string): Promise<void> {
    await delay(300);
    const list = this.get('events', INITIAL_EVENTS);
    this.set('events', list.filter(i => i.id !== id));
  }

  // --- News ---
  async getNews(): Promise<NewsPost[]> {
    await delay(300);
    return this.get('news', INITIAL_NEWS);
  }

  async addNews(news: Omit<NewsPost, 'id' | 'date'>): Promise<NewsPost> {
    await delay(500);
    const list = this.get('news', INITIAL_NEWS);
    const newItem = { 
      ...news, 
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    this.set('news', [newItem, ...list]);
    return newItem;
  }

  async deleteNews(id: string): Promise<void> {
    await delay(300);
    const list = this.get('news', INITIAL_NEWS);
    this.set('news', list.filter(i => i.id !== id));
  }

  // --- Services ---
  async getServices(): Promise<Service[]> {
    return this.get('services', INITIAL_SERVICES);
  }
}

export const db = new MockDB();
