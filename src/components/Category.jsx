import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiBowlOfRice } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
    return (
        <List>
            <Slink to = {'/cuisine/Indian'}>
                <FaPizzaSlice />
                <h4>Indian</h4>
            </Slink>
            <Slink to = {'/cuisine/American'}>
                <FaHamburger />
                <h4>American</h4>
            </Slink>
            <Slink to = {'/cuisine/Thai'}>
                <GiNoodles />
                <h4>Thai</h4>
            </Slink>
            <Slink to = {'/cuisine/Chinese'}>
                <GiBowlOfRice />
                <h4>Chinese</h4>
            </Slink>
        </List>
    );
}


const List = styled.div` 
display: flex;
justify-content: center; 
margin: 2rem 1.5rem;
`;

const Slink = styled(NavLink)`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center; 
    border-radius: 20%;
    margin-right: 1rem;
    text-decoration: none;
    background: linear-gradient(to right, #ff704d, #f53d0f);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4 {
        color: #ffefe0;
        font-size: 1.2rem;
    }
    svg {
        color:  #ffefe0;
        font-size: 1.5rem;
        }
       
    &.active {
        background: #faab36;
        
        svg {
        color:  #292421;
        }
        h4 {
        color:  #292421;
        }
    }
    `;


export default Category 