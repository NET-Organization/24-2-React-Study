// 함수형 컴포넌트
const WelcomeMessage = () => {
    return <h1>환영합니다!</h1>
};

// props
const ParentComponent = () => {
    const message = "안녕하세요";

    return <ChildComponent greeting = {message} />;
};

const ChildComponent = (props) => {
    return <p>{props.greeting}</p>;
};

// 컴포넌트 간 데이터 흐름(부모-> 자식)

const App = () => [
    const users = ["Alice", "Bob", "CHarlie"];

    return (
        <div>
            {users.map((user, index) => {
                <UserComponent key={index} name={user} />
            })}
        </div>
    );
];