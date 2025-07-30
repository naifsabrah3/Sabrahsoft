import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, LogOut } from 'lucide-react';
import { portfolioData, adminCredentials } from '../mock';

const AdminPanel = ({ onLogout }) => {
  const [projects, setProjects] = useState(portfolioData.projects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'نظام ويب',
    technologies: '',
    image: '',
    demoLink: '',
    githubLink: '',
    featured: false
  });

  const handleAddProject = () => {
    const project = {
      ...newProject,
      id: Date.now(),
      technologies: newProject.technologies.split(',').map(t => t.trim()),
      bgColor: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    
    setProjects([...projects, project]);
    setNewProject({
      title: '',
      description: '',
      category: 'نظام ويب',
      technologies: '',
      image: '',
      demoLink: '',
      githubLink: '',
      featured: false
    });
    setIsAddingProject(false);
  };

  const handleEditProject = (project) => {
    setEditingProject(project.id);
    setNewProject({
      ...project,
      technologies: project.technologies.join(', ')
    });
  };

  const handleUpdateProject = () => {
    const updatedProject = {
      ...newProject,
      id: editingProject,
      technologies: newProject.technologies.split(',').map(t => t.trim())
    };
    
    setProjects(projects.map(p => p.id === editingProject ? updatedProject : p));
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      category: 'نظام ويب',
      technologies: '',
      image: '',
      demoLink: '',
      githubLink: '',
      featured: false
    });
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة إدارة صبره سوفت</h1>
            <p className="text-gray-400 mt-2">إدارة المشاريع والأعمال</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="flex items-center space-x-2 space-x-reverse bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </motion.button>
        </div>

        {/* Add Project Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingProject(true)}
          className="mb-8 flex items-center space-x-2 space-x-reverse bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          <span>إضافة مشروع جديد</span>
        </motion.button>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/40 rounded-lg border border-white/10 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold truncate">{project.title}</h3>
                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={`p-1 rounded ${project.featured ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      {project.featured ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => handleEditProject(project)}
                      className="text-blue-400 hover:text-blue-300 p-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                <span className="inline-block bg-white/10 px-2 py-1 rounded text-xs">{project.category}</span>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="bg-gray-700 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Project Modal */}
        <AnimatePresence>
          {(isAddingProject || editingProject) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">
                      {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingProject(false);
                        setEditingProject(null);
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">عنوان المشروع</label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40"
                        placeholder="اسم المشروع"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">الوصف</label>
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40 resize-none"
                        placeholder="وصف المشروع"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">الفئة</label>
                      <select
                        value={newProject.category}
                        onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40"
                      >
                        <option value="نظام ويب">نظام ويب</option>
                        <option value="تطبيق أندرويد">تطبيق أندرويد</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">التقنيات (مفصولة بفاصلة)</label>
                      <input
                        type="text"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">رابط الصورة</label>
                      <input
                        type="url"
                        value={newProject.image}
                        onChange={(e) => setNewProject({...newProject, image: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">رابط المعاينة</label>
                        <input
                          type="url"
                          value={newProject.demoLink}
                          onChange={(e) => setNewProject({...newProject, demoLink: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40"
                          placeholder="https://demo.example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">رابط GitHub</label>
                        <input
                          type="url"
                          value={newProject.githubLink}
                          onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-white/40"
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          checked={newProject.featured}
                          onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
                          className="rounded"
                        />
                        <span className="text-sm">مشروع مميز</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 space-x-reverse mt-6">
                    <button
                      onClick={() => {
                        setIsAddingProject(false);
                        setEditingProject(null);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      إلغاء
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={editingProject ? handleUpdateProject : handleAddProject}
                      className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2 space-x-reverse"
                    >
                      <Save size={18} />
                      <span>{editingProject ? 'تحديث' : 'حفظ'}</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;