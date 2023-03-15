import { styled } from '@mui/material/styles';

export const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '1fr',
  gridTemplateAreas: `
    "navbar"
    "content"
  `,
});

export const NavbarWrapper = styled('div')({
  gridArea: 'navbar',
});

export const ContentWrapper = styled('div')({
  gridArea: 'content',
});