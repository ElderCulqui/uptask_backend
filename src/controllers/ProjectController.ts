import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
    
    static createProject = async (req: Request, res: Response) => {
        
        const project = new Project(req.body)

        try {
            await project.save()
            return res.send('Proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }
    
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            return res.json(projects)
        } catch (error) {
            console.error(error)
        }
    }
    
    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        
        try {
            const project = await Project.findById(id).populate('tasks')

            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ msg: error.message })
            }
            return res.json(project)
        } catch (error) {
            console.error(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findByIdAndUpdate(id, req.body)
            
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ msg: error.message })
            }

            await project.save()
            return res.send('Proyecto actualizado correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const project = await Project.findById(id)
            
            if (!project) {
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({ msg: error.message })
            }
            await project.deleteOne()
            return res.send('Proyecto eliminado correctamente')
        } catch (error) {
            console.log(error)
        }
    }
}