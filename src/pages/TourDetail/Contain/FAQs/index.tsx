import styled from "styled-components"
import { FlexBoxBetween, Text, Title } from "../../../../styled"
import { useEffect, useState } from "react"
import Button from "../../../../Component/BaseComponent/Button/Button"
import Icons from "../../../../Component/BaseComponent/Icons"

const setQuestionAnswer: {id: number, question: string, answer: string}[] = [
    {
        id: 1,
        question: 'How fit do I need to be to do this trek?',
        answer: 'Annapurna Base Camp is a Grade B or a moderately difficult trekking route. So any fit person can do this trek, even if you do not have any previous experience. You should be aware of what to expect and mentally prepare for it. Then, as long as you will too, you can.'
    },
    {
        id: 2,
        question: 'How long do we walk every day when doing Annapurna Base Camp trekking?',
        answer: 'Annapurna Base Camp is a Grade B or a moderately difficult trekking route. So any fit person can do this trek, even if you do not have any previous experience. You should be aware of what to expect and mentally prepare for it. Then, as long as you will too, you can.'
    },
    {
        id: 3,
        question: 'What is the highest altitude reached in this trek?',
        answer: 'Annapurna Base Camp is a Grade B or a moderately difficult trekking route. So any fit person can do this trek, even if you do not have any previous experience. You should be aware of what to expect and mentally prepare for it. Then, as long as you will too, you can.'
    },
    {
        id: 4,
        question: 'What about battery charging and hot shower facilities?',
        answer: 'Annapurna Base Camp is a Grade B or a moderately difficult trekking route. So any fit person can do this trek, even if you do not have any previous experience. You should be aware of what to expect and mentally prepare for it. Then, as long as you will too, you can.'
    },
    {
        id: 5,
        question: 'Are there ATMs on the way to Annapurna Base Camp?',
        answer: 'Annapurna Base Camp is a Grade B or a moderately difficult trekking route. So any fit person can do this trek, even if you do not have any previous experience. You should be aware of what to expect and mentally prepare for it. Then, as long as you will too, you can.'
    },
    {
        id: 6,
        question: 'How much do guides and porters cost?',
        answer: 'Annapurna Base Camp is a Grade B or a moderately difficult trekking route. So any fit person can do this trek, even if you do not have any previous experience. You should be aware of what to expect and mentally prepare for it. Then, as long as you will too, you can.'
    },
]

interface FAQsProps {
}


interface ItemProps {
    question: string;
    answer: string;
    showAll: boolean; 
}

const Item: React.FC<ItemProps> = ({ question, answer, showAll }) => {
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    
    useEffect(() => {
        setShowAnswer(showAll);
    }, [showAll]);

    return (
        <ItemWrapper>
            <Question onClick={() => setShowAnswer(!showAnswer)} >
                <Text small bold >
                    {question}
                </Text>
                {!showAnswer ? <Icons.PlusIcon hover/> : <Icons.MinusIcon hover/> }
            </Question>
            {showAnswer && (
                <Answer>
                    <Text small>{answer}</Text>
                </Answer>
            )}
        </ItemWrapper>
    );
};


export const FAQs: React.FC<FAQsProps> = ({}) => {
    const [showAll, setShowAll] = useState<boolean>(false);

    const handleShowAll = () => {
        setShowAll(!showAll); 
    };

    return (
        <Wrap>
            <FlexBoxBetween>
                <Title small>FAQs</Title>
                <Button white onClick={handleShowAll}>
                    {showAll ? "Đóng tất cả" : "Mở tất cả"}
                </Button>
            </FlexBoxBetween>
            {setQuestionAnswer.map((item, index) => {
                return (
                    <Item
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        showAll={showAll} 
                    />
                );
            })}
        </Wrap>
    );
};


const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`


const ItemWrapper = styled.div`
    width: 100%;
    border-top: 1px solid #444444;
    /* border-bottom: 1px solid #444444; */
`

const Question = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
`
const Answer = styled.div`
    
`