type PaginationButtonsProps = {
  start: string | null;
  end: string | null;
  next: boolean | null;
  previous: boolean | null;
  onPage: (value: string, value2: string) => void;
};

const PaginationButtons: React.FC<PaginationButtonsProps> = ({start, end, next, previous, onPage}) => {
  return (
    <div className="d-flex justify-content-center my-2">
      {previous && (
        <button className="btn btn-sm btn-primary mx-1 bi bi-arrow-left"
          onClick={() => onPage("last", 'before: "' + start + '"')}></button>
      )}
      {next && (
        <button className="btn btn-sm btn-primary mx-1 bi bi-arrow-right"
          onClick={() => onPage("first", 'after: "' + end + '"')}></button>
      )}
    </div>
  );
};

export default PaginationButtons;