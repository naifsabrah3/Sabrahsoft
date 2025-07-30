import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { portfolioData } from '../mock';

const ProjectsSection = () => {
  const [filter, setFilter] = useState('الكل');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['الكل', 'نظام ويب', 'تطبيق أندرويد'];
  
  const filteredProjects = filter === 'الكل' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            أعمالي
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            مجموعة من المشاريع التي عملت عليها في مجال تطوير المواقع والتطبيقات
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap gap-4 bg-black/30 backdrop-blur-sm rounded-full p-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  filter === category
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex items-center justify-center text-6xl text-white/20"
                    >
                      {project.category === 'نظام ويب' ? '🌐' : '📱'}
                    </motion.div>
                    
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                          مميز
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/10 text-white rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-white rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-white text-black py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                      >
                        <ExternalLink size={16} />
                        <span>معاينة</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 border border-white/30 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                      >
                        <Github size={16} />
                        <span>الكود</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">التقنيات المستخدمة:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <ExternalLink size={20} />
                      <span>معاينة المشروع</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center space-x-2 space-x-reverse"
                    >
                      <Github size={20} />
                      <span>عرض الكود</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </animatepresence>
      </div>
    </section>
  );
};

export default ProjectsSection;