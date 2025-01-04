const UserCard = ({user}) => {
  const { photoUrl, firstName, lastName ,  gender, about } = user
  return (
    <div className="card bg-base-200 w-96 shadow-2xl">
      <figure>
        <img
          src={photoUrl}
          alt={`${firstName}'s Profile`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName}  {lastName}
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
