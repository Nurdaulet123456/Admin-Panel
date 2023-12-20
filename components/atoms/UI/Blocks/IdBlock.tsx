import styled from "@emotion/styled";

export const IdBlock = styled.div<{background?: string, color?: string, border?: string}>`
    padding: 1rem 3rem;

    border: 1px solid #092C4C;
    border-radius: 66px;
    
    font-size: 1.6rem;
    font-weight: 500;
    color: #092C4C;
    
    cursor: pointer;

    transition: background-color .2s linear, color .2s linear, border-color .2s linear;

    background-color: ${props => props.background ? props.background : 'transparent'};
    color: ${props => props.color ? props.color : '#092C4C'};
    border-color: ${props => props.border ? props.border : '#092C4C'};

    &:hover {
        background-color: #4090FF;
        color: #FFFFFF;
        border-color: white;
    }
`