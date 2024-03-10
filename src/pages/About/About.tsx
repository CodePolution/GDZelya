import Root, { Person, renderAvatar, people} from "../Root";
import { Progress, Card, Flex } from "antd";
import type { ProgressProps } from "antd";

import './About.less';
import React, { useEffect, useState } from "react";


const conicColors: ProgressProps['strokeColor'] = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};


const peopleContibuting = {
    'React': [
        people[0],
        people[1]
    ],

    'TypeScript': [
        people[0]
    ],

    'Docker': [
        people[4]
    ],

    'Django': [
        people[0],
        people[2],
        people[3],
    ],

    'DRF': [
        people[0],
        people[2],
        people[3],
    ],

    'PostgreSQL': [
        people[2],
        people[3]
    ]
}

const JavaScriptColor: ProgressProps['strokeColor'] = {
    "0%": 'rgba(255, 255, 0, 0.904)',
    '50%': 'rgba(255, 196, 0, 0.904)',
    '100%': 'rgba(255, 153, 0, 0.904)'
}

const ReactColor: ProgressProps['strokeColor'] = {
    "0%": 'rgba(0, 110, 255, 0.904)',
    '50%': 'rgba(0, 153, 255, 0.904)',
    '100%': 'rgba(38, 0, 255, 0.904)'
}

const PythonColor: ProgressProps['strokeColor'] = {
    "0%": 'rgba(0, 119, 255, 0.904)',
    '50%': 'rgba(0, 153, 255, 0.904)',
    '75%': 'rgba(255, 238, 0, 0.904)',
    '100%': 'rgba(255, 238, 0, 0.904)'
}

const DockerColor: ProgressProps['strokeColor'] = {
    "0%": 'rgba(0, 255, 234, 0.904)',
    '50%': 'rgba(0, 195, 255, 0.904)',
    '100%': 'rgba(0, 132, 255, 0.904)'
}

const DjangoColor: ProgressProps['strokeColor'] = {
    "0%": 'rgba(30, 168, 3, 0.904)',
    '50%': 'rgba(28, 151, 3, 0.904)',
    '100%': 'rgba(24, 129, 3, 0.904)'
}


const DrfColor: ProgressProps['strokeColor'] = {
    '0%': 'rgba(129, 49, 3, 0.904)',
    '50%': 'rgba(129, 7, 3, 0.904)',
    '100%': 'rgba(182, 10, 4, 0.904)'
}


interface IStatisticsCardProps {
    title: string
    value?: number
    color?: ProgressProps['strokeColor'] | string
    people?: Person[]
}


const StatisticsCard: React.FC<IStatisticsCardProps> = ({
    title,
    value,
    color,
    people
}) => {
    return (
        <Card className="statistics-card">
            <Progress type="dashboard" percent={value || 0} strokeColor={color || conicColors} status="active"/>
            <span className="statistics-title">{title}</span>

            <div className="people-worked">
                {
                    people?.map(
                        (person) => renderAvatar(person, 'small', 'bottom')
                    )
                }
            </div>
        </Card>
    )
}

const About = () => {
    const percentage = {
        'React': 25,
        'Django': 45,
        'Docker': 23,
        'DRF': 67,
        'TypeScript': 12,
        'PostgreSQL': 56
    }

    return (
        <Root>
            <div className="statistics">
                <StatisticsCard title="React" value={percentage.React} color={ReactColor} people={peopleContibuting.React} />
                <StatisticsCard title="TypeScript" value={percentage.TypeScript} color={ReactColor} people={peopleContibuting.TypeScript} />
                <StatisticsCard title="Docker" value={percentage.Docker} color={DockerColor} people={peopleContibuting.Docker} />
                <StatisticsCard title="Django" value={percentage.Django} color={DjangoColor} people={peopleContibuting.Django} />
                <StatisticsCard title="DRF" value={percentage.DRF} color={DrfColor} people={peopleContibuting.DRF} />
                <StatisticsCard title="PostgreSQL" value={percentage.PostgreSQL} color={ReactColor} people={peopleContibuting.PostgreSQL} />
            </div>
        </Root>
    )
}

export default About