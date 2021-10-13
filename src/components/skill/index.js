import SVG from "react-inlinesvg";

const Skill = ({ icon }) => {
    return (
        <div className="skill">
            <SVG
                className="skill__icon"
                src={icon.url}
                width={60}
                height={60}
            />
        </div>
    );
};

export default Skill;
