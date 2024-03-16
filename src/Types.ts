import * as yup from 'yup';


const Cover = yup.object({
    id: yup.number().required(),
    url: yup.string().required()
})


const Subject = yup.object({
    id: yup.number().required(),
    title: yup.string().required()
})

const TaskImage = yup.object({
    id: yup.number().required(),
    url: yup.string().required()
})

const Task = yup.object({
    id: yup.number().required(),
    title: yup.string().required(),
    images: yup.array().of(TaskImage)
})



const Part = yup.object({
    id: yup.number().required(),
    title: yup.number().required(),
    tasks: yup.array().of(Task)
})

const Book = yup.object({
    id: yup.number().required(),
    cover: Cover,
    subject: Subject,
    title: yup.string().required(),
    year: yup.number().required(),
    classes: yup.array()
    .of(
        yup.number().min(1).max(11)
    ).required(),
    authors: yup.array()
    .of(
        yup.string()
    ).required(),
    description: yup.string().notRequired(),
    publisher: yup.string().required(),
    subtype: yup.string().notRequired(),
    parts: yup.array().of(Part).notRequired(),
    search_keywords: yup.string().notRequired(),
    updated_at: yup.date().notRequired()    
})


type TCover = yup.InferType<typeof Cover>
type TSubject = yup.InferType<typeof Subject>
type TTaskImage = yup.InferType<typeof TaskImage>
type TTask = yup.InferType<typeof Task>
type TPart = yup.InferType<typeof Part>
type TBook = yup.InferType<typeof Book>


export { Cover, Subject, TaskImage, Task, Part, Book }
export type { TCover, TSubject, TTaskImage, TTask, TPart, TBook }