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
    background: #6E8894;
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4 {
        color: #2A2D34;
        font-size: 1.2rem;
    }
    svg {
        color:  #2A2D34;
        font-size: 1.5rem;
        }
       
    &.active {
        background: linear-gradient(to right, #537562, #328054);
        
        svg {
        color:  #CEEDDB;
        }
        h4 {
        color:  #CEEDDB;
        }
    }
    `;


export default Category 