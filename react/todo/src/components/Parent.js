import { useState } from 'react';
import Child1 from './Child1';
import Child2 from './Child2';

export default function Parent() {
    const pName = 'mignon';
    const [name, setName] = useState('mignon');

    return (
        <>
            <h1>Props 변경 테스트</h1>
            <p>state 상태가 아닌 props: {pName}은 자식이 못바꾼다. </p>
            <Child1 name={pName} />
            <p>state 상태인 props: {name}은 자식이 바꾼다.</p>
            <Child2 name={name} setName={setName} />
        </>
    );
}