import { Grid } from "@nextui-org/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "../../Layout";
import RecordList from "./RecordList";
import ShipInfo from "../../common/ShipInfo";
import ShipSelector from "./ShipSelector";
import { Ship } from "../../../lib/db/entity/Ship";
import ShipModal from "./Modals/ShipModal";
import Head from "next/head";

interface ModalStateI {
  [key: string]: {
    visible: boolean;
    closeHandler: () => void;
  };
}

function DashboardPage({ ships }: { ships: Ship[] }): JSX.Element {
  const { data: session } = useSession();
  const [ship, setShip] = useState<Ship | null>( ships[0]);
  const [modalStates, setModalStates] = useState<ModalStateI>({
    shipModal: {
      visible: false,
      closeHandler: () => handleModal("shipModal", false),
    },
    memberModal: {
      visible: false,
      closeHandler: () => handleModal("memberModal", false),
    },
  });

  const selectShipHandler = (id: string) => {
    const selectedShip = ships.find((s) => s.id === id);
    setShip(selectedShip || null);
  };

  const handleModal = (modalName: string, visible: boolean) => {
    const newState = {
      ...modalStates,
      [modalName]: {
        ...modalStates[modalName],
        visible,
      },
    };
     setModalStates(newState);
  };

  return (
    <>
     <Head>
        <title>{`${ship.name ?? 'Hallintapaneeli'}` }</title>
        <meta property="og:title" content={`${ship.name ?? 'Hallintapaneeli'}`} key="title" />
      </Head>
    <Layout>
      <p>
        Signed in as {session?.user.name || null}{" "}
        <Link href="/api/auth/signout">
          Sign out
        </Link>
      </p>
      <Grid.Container gap={2} direction="column">
        <Grid xs={12}>
          <ShipSelector ships={ships} selectShipHandler={selectShipHandler} />
        </Grid>
        {ship ? (
          <>
            <Grid xs={12}>
              <ShipInfo
                ship={ship}
                clickable
                onClick={() => handleModal("shipModal", true)}
              />
            </Grid>
            <Grid xs={12}>
              <RecordList ship={ship} />
            </Grid>
          </>
        ) : null}
      </Grid.Container>
      <ShipModal {...modalStates.shipModal} ship={ship} />
    </Layout>
    </>
  );
}

export default DashboardPage;
