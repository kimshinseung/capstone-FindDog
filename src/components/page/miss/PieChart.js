/**
 * ./src/components/page/miss/PieChart.js
 * 파이 차트
 */

import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import {VictoryPie, VictoryLabel} from 'victory';

export const PieChart = () => {
    const [findRatio, setFindRatio] = useState(0.0);

    const ratio = 30;
    
    // 차트에 반영될 데이터
    const data = [
        {quarter: 1, earnings: ratio, label: "발견"},
        {quarter: 2, earnings: 100-ratio, label: "미발견"}
    ];

    useEffect = () => {
        
    }

    return (
        <>
            <svg width={500} height={500}>

                {/* #93c58c | #69a65f | #376330 */}

                <circle cx={250} cy={250} r={85} fill="#376330">
                    
                </circle>
                <VictoryPie
                    data={ data }
                    x="quarter"
                    y="earnings"

                    categories={{
                        quarter: ["발견", "미발견"]
                    }}

                    animate={{
                        duration: 2000
                    }}
                    
                    colorScale={["#69a65f", "#93c58c"]}
                    
                    padding={{
                        top: 50, bottom: 50
                    }}

                    standalone={false}
                    width={500}
                    height={500}
                    innerRadius={95}
                    labelRadius={({ innerRadius }) => innerRadius + 35 }
                    
                    style={{
                        labels: {
                            fontFamily: 'NanumSquare',
                            fontSize: 15,
                            fontWeight: 600,
                            fill: "#ffffff"
                        }
                    }}
                />
                <VictoryLabel
                    text="실종 반려견 발견 비율(%)"
                    textAnchor="middle"  // 가운데 정렬
                    verticalAnchor="middle"  // 가운데 정렬
                    x={250}  // 원의 x 좌표
                    y={250}  // 원의 y 좌표
                    style={{
                        fontFamily: 'NanumSquare',
                        fontSize: 15,
                        fontWeight: 400,
                        fill: "#ffffff"
                    }}
                />
            </svg>
        </>
    )
}