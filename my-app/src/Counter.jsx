import  React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    const [text, setText] = useState(0);

    return (
        <div>
            <p>현재 카운트: {count}</p>
            <button onClick = {() => setCount(count + 1)}>카운트 증가</button>
            <input
                type="text"
                value = {text}
                onChange={(e) => setText(e.target.value)}
            />
            <p>입력한 값: {text}</p>
        </div>
    );
};

export default Counter;
