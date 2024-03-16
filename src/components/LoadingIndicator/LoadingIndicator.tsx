import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


interface ILoadingIndicatorProps {
    loading: boolean
    fontSize?: number
    asBlock?: boolean
}

const LoadingIndicator: React.FC<ILoadingIndicatorProps> = ({
    loading,
    fontSize,
    asBlock
}) => {
    fontSize = fontSize || 55

    const renderIndicator = () => (
        <Spin indicator={<LoadingOutlined style={{ fontSize }} spin />} className="loading-indicator"/>
    )
    
    if (!loading) {
        return null
    }

    return asBlock ? (
        <div className='loading-block'>
            {renderIndicator()}
        </div>
    ) : (
        renderIndicator()
    )
}

export default LoadingIndicator