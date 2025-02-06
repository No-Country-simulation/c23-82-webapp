interface Props {
    children: React.ReactNode;
    height?: string;
    width?: string;
    background?: string;
    foreground?: string;
    margin?: string;
    padding?: string;
}

function Card(props: Props) {
    return (
        <div className={`card border ${props.width} ${props.height} ${props.background} ${props.foreground} ${props.margin} ${props.padding}`}>
            {props.children}
        </div>
    )
}

export default Card;