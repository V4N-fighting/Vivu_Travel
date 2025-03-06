import styled from "styled-components"
import {Icon, Text, Title } from "../../../../styled"
import Icons from "../../../../Component/BaseComponent/Icons"

interface ExpenseProps {
    
}

const include: string[] = [
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
]

const exclude: string[] = [
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
    'Pick-up or Drop-off service from and to Airport(in our own vehicle)',
]

export const Expense:React.FC<ExpenseProps> = ({}) => {
    return (
        <Wrap>
            <Title small>Expense</Title>
            <Include>
                <Text small bold >Expense includes</Text>
                {include.map((val, index) => {
                    return (
                        <Text small key={index}>
                            <Icons.CircleCheckIcon color="green"/>
                            {val}
                        </Text>
                    )
                })}
                
            </Include>
            <Exclude>
                <Text small bold >Expense includes</Text>
                {exclude.map((val, index) => {
                    return (
                        <Text key={index} small>
                            <Icons.CircleXmartIcon color="red"/>
                            {val}
                        </Text>
                    )
                })}
            </Exclude>
            
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`

const Include = styled.div`
    padding: 10px 0;
`

const Exclude = styled.div`
    padding: 10px 0;
    
`