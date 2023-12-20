import styled from "@emotion/styled";

interface ColorBlockProps {
    color?: string
    circle?: boolean
}

export const ColorBlock = styled.div<ColorBlockProps>`
    width: 100%;
    max-width: 80px;
    height: 41px;
    border-radius: 6px;
    background-color: ${props => props.color};
    cursor: pointer;

    ${props => props.circle && `
        width: 30px;
        height: 30px;
        border-radius: 50%;

        background-color: ${props.color};
    `}
`