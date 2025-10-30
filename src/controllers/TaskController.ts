import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            return res.json('Tarea creada correctamente')
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error: ' + error})
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            return res.json(tasks)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error: ' + error})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            return res.json(req.task)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error: ' + error})
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            await req.task.updateOne(req.body)
            return res.json('Tarea actualizada correctamente')
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error: ' + error})
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter( task => task._id.toString() !== req.task._id.toString() )
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])

            return res.json('Tarea eliminada correctamente')
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error: ' + error})
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body
            req.task.status = status
            await req.task.save()
            res.send('Tarea actualizada correctamente')
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Hubo un error: ' + error})
        }
    }
}