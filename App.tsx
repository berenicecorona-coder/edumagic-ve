
import React, { useState, useEffect } from 'react';
import { Lapso, Task, ExtractedTask } from './types';
import { getStoredTasks, saveTasks, updateTask, deleteTask } from './services/storageService';
import { Dashboard } from './components/Dashboard';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { LayoutGrid, ClipboardList, Stars, Sparkles, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeLapso, setActiveLapso] = useState<Lapso>(Lapso.PRIMERO);
  const [extractedTasks, setExtractedTasks] = useState<ExtractedTask[] | null>(null);
  const [view, setView] = useState<'dashboard' | 'list'>('dashboard');

  useEffect(() => {
    setTasks(getStoredTasks());
  }, []);

  const handleTasksExtracted = (extracted: ExtractedTask[]) => {
    setExtractedTasks(extracted);
  };

  const handleConfirmTasks = (newTasks: Task[]) => {
    const updatedTasks = [...tasks, ...newTasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setExtractedTasks(null);
    setView('list');
  };

  const handleUpdateTask = (updated: Task) => {
    const newTasks = tasks.map(t => t.id === updated.id ? updated : t);
    setTasks(newTasks);
    updateTask(updated);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("¿Deseas borrar este recuerdo escolar?")) {
      const newTasks = tasks.filter(t => t.id !== id);
      setTasks(newTasks);
      deleteTask(id);
    }
  };

  return (
    <div className="min-h-screen pb-24 selection:bg-yellow-200 overflow-x-hidden relative">
      {/* Estrellas decorativas de fondo */}
      <div className="star top-10 left-10 w-4 h-4" />
      <div className="star top-40 right-20 w-3 h-3" />
      <div className="star bottom-20 left-1/4 w-5 h-5" />

      {/* Header Estilo Disney */}
      <header className="bg-white/80 backdrop-blur-md border-b-4 border-blue-100 sticky top-0 z-40 px-6 py-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-full shadow-xl ring-4 ring-blue-100">
              <Wand2 size={32} className="text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-blue-900 tracking-tighter leading-none flex items-center gap-2">
                EduMagic VE
                <Sparkles className="text-yellow-400" size={20} />
              </h1>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mt-1">Organizador Mágico</p>
            </div>
          </div>
          
          <div className="flex bg-blue-50 p-1.5 rounded-full border-2 border-blue-100 overflow-x-auto max-w-full no-scrollbar">
            {Object.values(Lapso).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLapso(l)}
                className={`px-6 py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap ${activeLapso === l ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-blue-400 hover:text-blue-600'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 mt-10">
        <TaskInput onTasksExtracted={handleTasksExtracted} currentLapso={activeLapso} />

        {/* View Switcher Juguetón */}
        <div className="flex items-center justify-center gap-3 mb-10 mt-12 bg-white/50 backdrop-blur p-2 rounded-full w-fit mx-auto border-2 border-blue-50 shadow-sm">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-8 py-3 font-black text-sm rounded-full transition-all ${view === 'dashboard' ? 'bg-blue-600 shadow-xl text-white' : 'text-blue-400 hover:bg-blue-50'}`}
          >
            <LayoutGrid size={18} /> DASHBOARD
          </button>
          <button 
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-8 py-3 font-black text-sm rounded-full transition-all ${view === 'list' ? 'bg-blue-600 shadow-xl text-white' : 'text-blue-400 hover:bg-blue-50'}`}
          >
            <ClipboardList size={18} /> {activeLapso.toUpperCase()}
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
          {view === 'dashboard' ? (
            <Dashboard tasks={tasks} activeLapso={activeLapso} />
          ) : (
            <TaskList 
              tasks={tasks} 
              activeLapso={activeLapso} 
              onUpdate={handleUpdateTask} 
              onDelete={handleDeleteTask} 
            />
          )}
        </div>
      </main>

      {extractedTasks && (
        <TaskModal 
          extracted={extractedTasks} 
          onConfirm={handleConfirmTasks} 
          onCancel={() => setExtractedTasks(null)}
          lapso={activeLapso}
        />
      )}

      <footer className="mt-20 py-12 text-center relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <p className="text-blue-400 text-sm font-bold flex items-center justify-center gap-2">
          Creado con <Stars className="text-yellow-400 inline" size={16} /> para las familias de Venezuela
        </p>
      </footer>
    </div>
  );
};

export default App;
