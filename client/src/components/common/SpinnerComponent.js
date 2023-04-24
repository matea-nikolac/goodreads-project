import spinnerGIF from '../../images/spinner.gif'

const SpinnerComponent = () => {
  return (
    <div className="spinner-container">
      <img className='spinner-gif' src={spinnerGIF} alt="Spinner Component" />
    </div>
  )
}

export default SpinnerComponent