import styled from 'styled-components';

function Logout() {
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (

    <div>
      <Btt onClick={logout}>
        Logout
      </Btt>
    </div>
  )
}
const Btt = styled.button`
        display: flex;
        border: none;
        background: #FFAB40;
        font-size: 1rem;
        color: #292421;
        padding: 1rem 0.8rem;
        border-radius: 0.5rem;
        outline: none;
        cursor: pointer;`;

export default Logout