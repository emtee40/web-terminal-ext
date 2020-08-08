var cmdCmd = function() {
    this.subCmds = {
        add: {
            desc: "<code>cmd add [command]</code> add a command. <code>cmd add github</code> the github command will be adding.",
            exec: function(command, terminal) {
                if (command.content.length > 1) {
                    let newCmd = command.content[1].trim();
                    // get the 
                    api_send_message({type: "cmdhub", method: "add", newCmd: newCmd, callback: function(res) {
                        if (res.meta.code == 200) {
                            $.extend(terminal.customcmds, res.meta.data);
                            for (let cmd in terminal.customcmds) {
                                terminal.all_commands[cmd] = terminal.customcmds[cmd]['index_func'];
                            }
                            terminal.displayOutput(newCmd+" added.");
                        } else {
                            terminal.displayErrorOutput(res.meta.msg);
                        }
                    }});
                } else {
                    terminal.displayErrorOutput("Input the command names what you want to add.");
                }
            }
        },
        update: {
            desc: "<code>cmd update [command]</code> update a command. <code>cmd update github</code> to update the github commands latest version.",
            exec: function(command, terminal) {
                if (command.content.length > 1) {
                    let newCmd = command.content[1].trim();
                    api_send_message({type: "cmdhub", method: "update", newCmd: newCmd, callback: function(res) {
                        if (res.meta.code == 200) {
                            $.extend(terminal.customcmds, res.meta.data);
                            for (let cmd in self.customcmds) {
                                terminal.all_commands[cmd] = terminal.customcmds[cmd]['index_func'];
                            }
                            terminal.displayOutput(newCmd+" updated.");
                        } else {
                            terminal.displayErrorOutput(res.meta.msg);
                        }
                    }});
                } else {
                    terminal.displayErrorOutput("Input the command names what you want to update.");
                }
            }
        },
        delete: {
            desc: "<code>cmd delete [command]</code> delete a command. <code>cmd delete github</code> to delete github command.",
            exec: function(command, terminal) {
                if (command.content.length > 1) {
                    let newCmd = command.content[1].trim();
                    api_send_message({type: "cmdhub", method: "delete", newCmd: newCmd, callback: function(res) {
                        if (res.meta.code == 200) {
                            delete terminal.customcmds[newCmd];
                            delete terminal.all_commands[newCmd];
                            terminal.displayOutput(newCmd+" deleted.");
                        } else {
                            terminal.displayErrorOutput(res.meta.msg);
                        }
                    }});
                } else {
                    terminal.displayErrorOutput("Input the command names what you want to delete.");
                }
            }
        }
    }
    this.desc = "This is Terminal's command manager. like nodejs npm.";
    this.Exec = function(command, terminal) {
        if (command.content.length > 0) {
            if (this.subCmds.hasOwnProperty(command.content[0])) {
                this.subCmds[command.content[0]].exec(command, terminal);
            } else {
                terminal.displayErrorOutput("invalid command "+command.content[0]);
            }
        } else {
            terminal.displayErrorOutput("please input sub command. like: browser bookmark <first content>");
        }
    }
}