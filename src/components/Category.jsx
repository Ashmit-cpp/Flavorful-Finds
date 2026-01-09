// components/Category.js
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiBowlOfRice } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  const categories = [
    { name: "Indian", icon: <FaPizzaSlice />, path: "/cuisine/Indian" },
    { name: "American", icon: <FaHamburger />, path: "/cuisine/American" },
    { name: "Thai", icon: <GiNoodles />, path: "/cuisine/Thai" },
    { name: "Chinese", icon: <GiBowlOfRice />, path: "/cuisine/Chinese" },
  ];

  return (
    <Section>
      <Wrapper>
        <Grid>
          {categories.map((item) => (
            <CategoryCard key={item.name} to={item.path}>
              <IconWrapper>{item.icon}</IconWrapper>
              <h4>{item.name}</h4>
            </CategoryCard>
          ))}
        </Grid>
      </Wrapper>
    </Section>
  );
}

/* ---------- Styles ---------- */

const Section = styled.section`
  position: relative;
  z-index: 2;
`;

const Wrapper = styled.div`
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #f5f5f4;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
  width: 72%;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 1.75rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryCard = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.75rem 0.5rem;
  border-radius: 0.75rem;
  background: #fafaf9;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;
  cursor: pointer;

  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1c1917;
    line-height: 1.2;
  }

  &:hover {
    background: #fff7ed;
    transform: translateY(-2px);

    h4 {
      color: #c2410c;
    }

    svg {
      color: #c2410c;
    }
  }

  &.active {
    background: #ffedd5;
    border: 1px solid #fed7aa;

    h4,
    svg {
      color: #c2410c;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 1.6rem;
  color: #57534e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Category;
