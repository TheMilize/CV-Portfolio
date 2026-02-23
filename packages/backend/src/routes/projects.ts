import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

const router = Router()

// Получить все проекты
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    // Здесь будет логика получения проектов из БД
    const projects = [
      {
        id: 1,
        title: '3D Model Viewer',
        description: 'Веб-приложение для просмотра 3D-моделей. Поддержка glTF/GLB, OBJ, PLY, drag-and-drop, управление камерой, смена фона, скриншоты.',
        image: '/api/placeholder/400/300',
        technologies: ['Vue.js', 'Three.js', 'Vite', 'Docker'],
        demo: 'https://github.com/TheMilize/vue-3d-model-viewer',
        github: 'https://github.com/TheMilize/vue-3d-model-viewer',
        category: 'Frontend',
        date: '2026',
        type: 'Персональный'
      },
      {
        id: 2,
        title: 'E-commerce Platform',
        description: 'Современная платформа электронной коммерции с полным функционалом корзины, оплаты и управления товарами.',
        image: '/api/placeholder/400/300',
        technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Stripe'],
        demo: '#',
        github: '#',
        category: 'Full-stack',
        date: '2024',
        type: 'Коммерческий'
      },
      {
        id: 3,
        title: 'Task Management App',
        description: 'Приложение для управления задачами с drag-and-drop функциональностью и командной работой.',
        image: '/api/placeholder/400/300',
        technologies: ['Vue.js', 'TypeScript', 'Firebase', 'CSS3'],
        demo: '#',
        github: '#',
        category: 'Frontend',
        date: '2024',
        type: 'Персональный'
      }
    ]

    res.json({
      success: true,
      data: projects
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    })
  }
})

// Получить проект по ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    
    // Здесь будет логика получения проекта по ID из БД
    const project = {
      id: parseInt(id),
      title: 'Sample Project',
      description: 'Sample description',
      image: '/api/placeholder/400/300',
      technologies: ['Vue.js', 'Node.js'],
      demo: '#',
      github: '#',
      category: 'Full-stack',
      date: '2024',
      type: 'Коммерческий'
    }

    if (!project) {
      res.status(404).json({
        success: false,
        error: 'Project not found'
      })
      return
    }

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project'
    })
  }
})

// Создать новый проект (требует аутентификации)
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required')
], async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()
      })
      return
    }

    const { title, description, category, technologies, demo, github, date, type } = req.body

    // Здесь будет логика создания проекта в БД
    const newProject = {
      id: Date.now(),
      title,
      description,
      image: '/api/placeholder/400/300',
      technologies: technologies || [],
      demo: demo || '#',
      github: github || '#',
      category,
      date: date || new Date().getFullYear().toString(),
      type: type || 'Персональный'
    }

    res.status(201).json({
      success: true,
      data: newProject
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    })
  }
})

// Обновить проект (требует аутентификации)
router.put('/:id', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()
      })
      return
    }

    const { id } = req.params
    const updateData = req.body

    // Здесь будет логика обновления проекта в БД
    const updatedProject = {
      id: parseInt(id),
      ...updateData
    }

    res.json({
      success: true,
      data: updatedProject
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update project'
    })
  }
})

// Удалить проект (требует аутентификации)
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    // Здесь будет логика удаления проекта из БД

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    })
  }
})

export default router 