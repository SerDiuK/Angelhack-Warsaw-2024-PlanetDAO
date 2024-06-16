import { MappedMember } from '@/app/model/mapped-member';
import { Tooltip } from '@heathmont/moon-core-tw';
import { GenericInfo } from '@heathmont/moon-icons-tw';
import { Table } from '@heathmont/moon-table-tw';
import { ReactNode, useEffect, useMemo } from 'react';

const HeaderLabel = ({ children }: { children: ReactNode }) => <label className="flex items-center h-full">{children}</label>;

const MembersTable = ({ members }: { members: MappedMember[] }) => {
  const columnsInitial = [
    {
      Header: <HeaderLabel>Name</HeaderLabel>,
      accessor: 'name'
    },
    {
      Header: <HeaderLabel>Join date</HeaderLabel>,
      accessor: 'joinDate'
    },
    {
      Header: (
        <HeaderLabel>
          Vote power level
          <Tooltip>
            <Tooltip.Trigger>
              <div className="">
                <GenericInfo className="ml-1" fontSize={16} />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-gohan">
              This level is based on amount of received donations, votes, and comments within this community.
              <Tooltip.Arrow className="bg-gohan" />
            </Tooltip.Content>
          </Tooltip>
        </HeaderLabel>
      ),
      accessor: 'votePower'
    },
    {
      Header: <HeaderLabel>Votes received</HeaderLabel>,
      accessor: 'votesReceived',
      width: 100
    },
    {
      Header: <HeaderLabel>Donations received</HeaderLabel>,
      accessor: 'donationsReceived',
      width: 100
    }
  ];

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      maxWidth: 300
    }),
    []
  );

  const columns = useMemo(() => columnsInitial, []);

  async function loadData() {}
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="w-full max-w-full overflow-y-auto mx-4">
        <Table columns={columns} rowSize="xl" data={members} isSorting={true} defaultColumn={defaultColumn} defaultRowBackgroundColor="white" evenRowBackgroundColor="white" headerBackgroundColor="trunks" />
      </div>
    </>
  );
};

export default MembersTable;
