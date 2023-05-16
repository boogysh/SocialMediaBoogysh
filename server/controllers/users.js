import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const patchUserTwitterAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { twitterUrl } = req.body;

    const user = await User.findById(id);
    console.log(user);

    const updatedUser = await User.findByIdAndUpdate(id, {
      twitterUrl: twitterUrl,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const patchUserLinkedinAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { linkedinUrl } = req.body;

    const user = await User.findById(id);
    console.log(user);

    const updatedUser = await User.findByIdAndUpdate(id, {
      linkedinUrl: linkedinUrl,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//
// --------- ADD USER VISITOR-----------------
//
export const addUserVisitor = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(friendId);
    console.log(user);
    //-------------------------
    const time = new Date(Date.now());
    const guestExist = user.viewedProfile.filter((guest) => guest.id === id);
    const guestIdExist = guestExist.id === id;
    const sameUser = id === friendId;

    const guestUserData = await User.findById(id);
    // console.log("guestUserData", guestUserData);

    const newGuest = {
      id: id,
      firstName: guestUserData.firstName,
      lastName: guestUserData.lastName,
      url: guestUserData.url,

      visitedAt: `${time.toLocaleDateString()} - ${time.toLocaleTimeString()}`,
    };

    !guestIdExist && !sameUser && user.viewedProfile.unshift(newGuest);

    const updatedUser = await User.findByIdAndUpdate(friendId, {
      viewedProfile: user.viewedProfile,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const resetUserVisitors = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, {
      viewedProfile: [],
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserVisitors = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    //-----------------------------------
    // const visitors = await Promise.all(
    //   user.viewedProfile.map((guest) => User.findById(guest.id))
    // );

    // const formattedVisitors = visitors.map(
    //   ({ _id, firstName, lastName, url }) => {
    //     return {
    //       _id,
    //       firstName,
    //       lastName,
    //       url,
    //       visitedAt: zzz,
    //     };
    //   }
    // );
    // res.status(200).json(formattedVisitors);

    res.status(200).json(user.viewedProfile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, url }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          url,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, url }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          url,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
