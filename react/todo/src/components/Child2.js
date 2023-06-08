export default function Child2({ name, setName }) {

    return (
        <>
            <input defaultValue={name} onChange={e => setName(e.target.value)} />
        </>
    );
}