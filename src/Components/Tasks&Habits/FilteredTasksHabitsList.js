import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";
import TaskItem from "./Tasks/TaskItem";
import HabitItem from "./Habits/HabitItem";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.sizes.medium};
  width: 100%;
  padding: ${({ theme }) => theme.sizes.medium};

  @media (max-width: 375px) {
    padding: 3px;
  }
`;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  padding: ${({ theme }) => theme.sizes.medium};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.medium};
`;

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.medium};
`;

const FilteredTasksHabitsList = ({ taskDataUnits, habitDataUnits, fetchUpdateHandler }) => {
  return (
    <CardWrapper>
      <Wrapper>
        <Container>
          <h2>Active Tasks</h2>
          <div>
            {taskDataUnits.length > 0 ? (
              <ListWrapper>
                {taskDataUnits.map((task) =>
                  !task.isClosed ? (
                    <TaskItem
                      task={task}
                      key={task.id}
                      isDeleteActive={false}
                      onDeleteTaskDataUnit={() => {}}
                      fetchUpdateHandler={fetchUpdateHandler}
                    />
                  ) : (
                    ""
                  )
                )}
              </ListWrapper>
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </Container>
        <Container>
          <h2>Active Habits</h2>
          <div>
            {habitDataUnits.length > 0 ? (
              <ListWrapper>
                {habitDataUnits.map((habit) =>
                  !habit.isClosed ? (
                    <HabitItem
                      habit={habit}
                      key={habit.id}
                      isDeleteActive={false}
                      onDeleteHabitDataUnit={() => {}}
                      fetchUpdateHandler={fetchUpdateHandler}
                    />
                  ) : (
                    ""
                  )
                )}
              </ListWrapper>
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </Container>
      </Wrapper>
    </CardWrapper>
  );
};

export default FilteredTasksHabitsList;
