import React from 'react';
import CardList from '../components/Memberships/CardList'
import Title from "../components/Typographies/Title";

export default function Index() {
  return (
    <React.Fragment>
      <Title title="Memberships" />
      <CardList />
    </React.Fragment>
  );
}

