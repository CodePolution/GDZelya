import React, { useState } from "react"
import { Flex, Tabs, Button } from "antd"
import type { TabsProps } from "antd";


interface IBookTaskListProps {
    parts?: Array<number | string>
    tasks?: any[]
}



const BookTaskList: React.FC<IBookTaskListProps> = ({
    parts
}) => {
  const [currentPart, setCurrentPart] = useState<number>(1)
  const tasks = new Array(200).fill(0)

  const renderTaskList = (part: number) => {
    const tasksSliced = tasks.slice(100 * (part - 1), 100 * part)
    console.log('Tasks Sliced: ', tasksSliced)
    
    return (
      <Flex wrap="wrap" gap='middle'>
        {tasksSliced.map(
          (_, index) => <Button>{(part - 1) * 100 + index + 1}</Button>
        )}
      </Flex>
    )
  }

    const items: TabsProps['items'] = parts?.map(
      (part) => (
        {
          key: part.toString(),
          label: `Часть ${part}`,
          children: renderTaskList(parseInt(part.toString())),
        }
      )
    )

    return (
        <Tabs
            activeKey={currentPart.toString()}
            onChange={(activeKey: string) => setCurrentPart(parseInt(activeKey))}
            items={items}
        />
    )
}

export default BookTaskList