/**
 * ./src/components/page/forum/Pagination.js
 * 페이지네이션
 */

import styled from "styled-components";

function Pagination({ total, limit, now, setNow }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setNow(now - 1)} disabled={now === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setNow(i + 1)}
              aria-current={now === i + 1 ? "now" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setNow(now + 1)} disabled={now === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: #95C77E;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    color: black;
    background: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;