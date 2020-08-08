export const entry = ({ Notification, RunningConfig, Menu, StaticConfig }) => {
    RunningConfig.on('aTabHasBeenCreated', ({ client, instance, directory, tabElement, isEditor }) => {
        if(!isEditor) return
        client.do('onChanged', {
            instance,
            action() {
                if (StaticConfig.data.GAS == true) {
                    RunningConfig.emit('command.saveCurrentFile')
                }
            } 
        })
    });
    new Menu({
        button: 'GAS',
        list: [
            {
                label: 'Enable/Disable',
                action() {
                    switch (StaticConfig.data.GAS) {
                        case true:
                            StaticConfig.data.GAS = false;
                            new Notification({
                                title: "GAS",
                                content: "AutoSave Disabled!"
                            })
                            break;
                        case false:
                            StaticConfig.data.GAS = true;
                            new Notification({
                                title: "GAS",
                                content: "AutoSave Enabled!"
                            })
                            break;
                        default:
                            StaticConfig.data.GAS = true;
                            new Notification({
                                title: "GAS",
                                content: "AutoSave Enabled!"
                            })

                    }
                    StaticConfig.triggerChange();
                }
            }
        ]
    })
}
