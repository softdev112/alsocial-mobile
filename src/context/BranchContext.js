import React, { createContext, useState } from "react";

const BranchContext = createContext();

export const BranchConsumer = BranchContext.Consumer;

const BranchProvider = ({ children }) => {
    const [params, setParams] = useState({});
    const contextState = { params, setParams };

    return <BranchContext.Provider value={contextState}>{children}</BranchContext.Provider>;
};

export default BranchProvider;
