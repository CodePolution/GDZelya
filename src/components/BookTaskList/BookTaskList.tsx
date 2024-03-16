import React, { useState } from "react"
import { Flex, Tabs, Button } from "antd"
import type { TabsProps } from "antd";
import { TPart, TTask } from "../../Types";


interface IBookTaskListProps {
    parts: TPart[]
    tasks?: any[]
    onTaskClick?: (task: TTask) => void
}



const sortTasks = (a: TTask, b: TTask) => (
  parseInt(a.title) - parseInt(b.title)
)


const BookTaskList: React.FC<IBookTaskListProps> = ({
    parts,
    onTaskClick
}) => {
  const [currentPart, setCurrentPart] = useState<number>(1)

  const renderTaskList = (part: TPart) => {
    const tasks = part.tasks?.sort(sortTasks) || []
    
    return (
      <Flex wrap="wrap" gap='middle'>
        {tasks.map(
          (task) => (
            <Button
              onClick={() => onTaskClick?.(task)}
            >
              {task.title}
            </Button>
          )
        )}
      </Flex>
    )
  }

    const items: TabsProps['items'] = parts?.map(
      (part: TPart) => (
        {
          key: part.title.toString(),
          label: `Часть ${part.title}`,
          children: renderTaskList(part),
        }
      )
    )

    return (
        <>
          {
            parts.length <= 1 ? (
              <div className="tasks-untabbed">
                  {renderTaskList(parts[0])}
              </div>
            ) : (
              <Tabs
                  className="tasks-tabs"
                  activeKey={currentPart.toString()}
                  onChange={(activeKey: string) => setCurrentPart(parseInt(activeKey))}
                  items={items}
              />
            )
          }
        </>
    )
}

export default BookTaskList