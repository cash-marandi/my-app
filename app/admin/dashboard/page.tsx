'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Calendar, FileText, LogOut, Plus, Trash2, Edit } from 'lucide-react'; // Removed Briefcase icon
import { TeamMember, Event, NewsPost } from '@/types'; // Removed Service type import
import Modal from '@/components/Admin/Modal';
import TeamForm from '@/components/Admin/TeamForm';
import NewsForm from '@/components/Admin/NewsForm';
import EventForm from '@/components/Admin/EventForm';
// Removed ServiceForm import

type Tab = 'team' | 'events' | 'news'; // Removed 'services' from Tab type

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('team');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  // Removed services state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | Event | NewsPost | null>(null); // Removed Service type
  const [editingType, setEditingType] = useState<Tab | null>(null);

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        router.push('/admin/login');
        return; // Stop execution if not authenticated
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      // Fetch Team Data
      const teamRes = await fetch('/api/team');
      if (teamRes.ok) {
        const teamData: (TeamMember & { _id: string })[] = await teamRes.json();
        setTeam(Array.isArray(teamData) ? teamData.map(member => ({ ...member, id: member._id })) : []);
      } else {
        console.error("Failed to fetch team data:", await teamRes.text());
        setTeam([]);
      }

      // Fetch Events Data
      const eventsRes = await fetch('/api/events');
      if (eventsRes.ok) {
        const eventsData: (Event & { _id: string })[] = await eventsRes.json();
        setEvents(Array.isArray(eventsData) ? eventsData.map(event => ({ ...event, id: event._id })) : []);
      } else {
        console.error("Failed to fetch events data:", await eventsRes.text());
        setEvents([]);
      }

      // Fetch News Data
      const newsRes = await fetch('/api/news');
      if (newsRes.ok) {
        const newsData: (NewsPost & { _id: string })[] = await newsRes.json();
        setNews(Array.isArray(newsData) ? newsData.map(post => ({ ...post, id: post._id })) : []);
      } else {
        console.error("Failed to fetch news data:", await newsRes.text());
        setNews([]);
      }

      // Removed Fetch Services Data
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/');
  };

  const handleDelete = async (id: string | undefined, type: Tab) => {
    if (!id) {
        alert("Cannot delete item without an ID.");
        return;
    }
    if (!confirm('Are you sure? This action cannot be undone.')) return;

    try {
      let apiUrl = '';
      if (type === 'team') apiUrl = `/api/team/${id}`;
      else if (type === 'events') apiUrl = `/api/events/${id}`;
      else if (type === 'news') apiUrl = `/api/news/${id}`;
      // Removed services API URL
      const res = await fetch(apiUrl, { method: 'DELETE' });
      if (res.ok) {
        alert(`${type} item deleted successfully!`);
        loadData(); // Reload data after successful deletion
      } else {
        const errorData = await res.json();
        alert(`Error deleting ${type} item: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Error deleting ${type} item:`, error);
      alert(`An unexpected error occurred while deleting the ${type} item.`);
    }
  };

  const openAddModal = (type: Tab) => {
    console.log(`Opening Add Modal for type: ${type}`);
    setEditingItem(null); // Clear any previous editing data
    setEditingType(type);
    setIsModalOpen(true);
  };

  const openEditModal = (item: TeamMember | Event | NewsPost, type: Tab) => { // Removed Service type
    setEditingItem(item);
    setEditingType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setEditingType(null);
  };

  const handleFormSuccess = () => {
    loadData(); // Reload data after any form submission
    closeModal();
  };

  const renderForm = () => {
    if (editingType === 'team') {
      return <TeamForm initialData={editingItem as TeamMember} onSuccess={handleFormSuccess} onClose={closeModal} />;
    } else if (editingType === 'news') {
      return <NewsForm initialData={editingItem as NewsPost} onSuccess={handleFormSuccess} onClose={closeModal} />;
    } else if (editingType === 'events') {
      return <EventForm initialData={editingItem as Event} onSuccess={handleFormSuccess} onClose={closeModal} />;
    }
    // Removed services form rendering
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white fixed h-full hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold font-serif">Panorama Admin</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'team' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users size={20} /> Team
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Calendar size={20} /> Events
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'news' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <FileText size={20} /> News
          </button>
          {/* Removed Services tab button */}
        </nav>
        <div className="absolute bottom-6 px-4 w-full">
           <button onClick={handleLogout} className="w-full flex items-center gap-2 text-slate-400 hover:text-white px-4 py-2">
             <LogOut size={18} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 pt-20">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">Manage {activeTab}</h1>
          <button
            onClick={() => openAddModal(activeTab)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
          >
            <Plus size={18} /> Add New
          </button>
        </header>

        {/* Content List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'team' && (
            <div className="divide-y divide-gray-100">
              {team.map(member => (
                <div key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <img src={member.imageUrl} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(member, 'team')} className="text-blue-400 hover:text-blue-600 p-2"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(member.id, 'team')} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
             <div className="divide-y divide-gray-100">
             {events.map(event => (
               <div key={event.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={event.imageUrl} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900">{event.title}</h4>
                     <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(event, 'events')} className="text-blue-400 hover:text-blue-600 p-2"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(event.id, 'events')} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                 </div>
               </div>
             ))}
           </div>
          )}
          
          {activeTab === 'news' && (
             <div className="divide-y divide-gray-100">
             {news.map(item => (
               <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                 <div>
                   <h4 className="font-bold text-gray-900">{item.title}</h4>
                   <p className="text-sm text-gray-500">{item.date} | {item.category}</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(item, 'news')} className="text-blue-400 hover:text-blue-600 p-2"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(item.id, 'news')} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                 </div>
               </div>
             ))}
           </div>
          )}

          {/* Removed services content list */}
        </div>
      </main>

      {/* Modal for Add/Edit Forms */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? `Edit ${editingType}` : `Add New ${editingType}`}
      >
        {renderForm()}
      </Modal>
    </div>
  );
}
