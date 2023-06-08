const FormWrapper = ({ onSubmit, children }) => {
  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(event);
  }

  return(<form onSubmit={submitHandler} id="form">
    {children}
  </form>)
};

export default FormWrapper;
