const Mybutton = () => {
    return <button>클릭하세요!</button>
};

const Mybtn = () => {
    const userName = '학생 여러분';
    return <button>{userName}, 클릭하세요!</button>;
}

const ParentComponent = () => {
    const message = "안녕하세요!";

    return <ChildComponent greeting = {message} />;
}

const ChildComponent = (props) => {
    return <p>{props.greeting}</p>;
}

const App = () => {
    const users = ["Alice", "Bob", "Charlie"];

    return (
        <div>
            {users.map((user, index) => (
                <UserComponent key = {index} name = {user} />
            ))}
        </div>
    );
};

const UserComponent = (props) => {
    return <p>사용자 이름: {props.name}</p>
}

